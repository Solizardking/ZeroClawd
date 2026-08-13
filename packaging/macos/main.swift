import Cocoa
import WebKit

final class AppDelegate: NSObject, NSApplicationDelegate, WKScriptMessageHandler {
    var window: NSWindow!
    var webView: WKWebView!
    var cliURL: URL!

    func applicationDidFinishLaunching(_ notification: Notification) {
        let resources = Bundle.main.resourceURL
        cliURL = Bundle.main.bundleURL
            .appendingPathComponent("Contents/MacOS/clawdbot-cli")

        let screen = NSScreen.main?.visibleFrame ?? NSRect(x: 0, y: 0, width: 1100, height: 760)
        let frame = NSRect(
            x: screen.midX - 480,
            y: screen.midY - 300,
            width: 960,
            height: 600
        )
        window = NSWindow(
            contentRect: frame,
            styleMask: [.titled, .closable, .miniaturizable, .resizable],
            backing: .buffered,
            defer: false
        )
        window.title = "Clawd Bot"
        window.isReleasedWhenClosed = false
        window.backgroundColor = NSColor(calibratedRed: 0.04, green: 0.05, blue: 0.06, alpha: 1)

        let config = WKWebViewConfiguration()
        config.userContentController.add(self, name: "clawdbot")
        webView = WKWebView(frame: window.contentView!.bounds, configuration: config)
        webView.autoresizingMask = [.width, .height]
        window.contentView?.addSubview(webView)

        if let html = resources?.appendingPathComponent("studio.html"),
           FileManager.default.fileExists(atPath: html.path) {
            webView.loadFileURL(html, allowingReadAccessTo: html.deletingLastPathComponent())
        } else {
            let fallback = "<html><body style='background:#0b0d10;color:#e8eef5;font-family:sans-serif;padding:32px'><h1>Clawd Bot</h1><p>Studio UI missing.</p></body></html>"
            webView.loadHTMLString(fallback, baseURL: nil)
        }

        window.makeKeyAndOrderFront(nil)
        NSApp.activate(ignoringOtherApps: true)
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        true
    }

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        guard let body = message.body as? [String: Any] else { return }
        let args = (body["args"] as? [String]) ?? ["version"]
        DispatchQueue.global(qos: .userInitiated).async {
            let output = self.runCLI(args)
            DispatchQueue.main.async {
                let escaped = output
                    .replacingOccurrences(of: "\\", with: "\\\\")
                    .replacingOccurrences(of: "`", with: "\\`")
                    .replacingOccurrences(of: "$", with: "\\$")
                self.webView.evaluateJavaScript("window.clawdbotResult(`\(escaped)`);", completionHandler: nil)
            }
        }
    }

    func runCLI(_ args: [String]) -> String {
        let proc = Process()
        if FileManager.default.isExecutableFile(atPath: cliURL.path) {
            proc.executableURL = cliURL
            proc.arguments = args
        } else if let bundled = Bundle.main.path(forAuxiliaryExecutable: "clawdbot-cli") {
            proc.executableURL = URL(fileURLWithPath: bundled)
            proc.arguments = args
        } else {
            return "clawdbot CLI is not embedded in this app."
        }
        let pipe = Pipe()
        proc.standardOutput = pipe
        proc.standardError = pipe
        do {
            try proc.run()
            proc.waitUntilExit()
        } catch {
            return "launch failed: \(error.localizedDescription)"
        }
        let data = pipe.fileHandleForReading.readDataToEndOfFile()
        return String(data: data, encoding: .utf8) ?? ""
    }
}

let app = NSApplication.shared
let delegate = AppDelegate()
app.delegate = delegate
app.setActivationPolicy(.regular)
app.run()
