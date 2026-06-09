"use client";

/* ================================================================ */
/*  IndustryPhone                                                    */
/*  A clean, realistic WhatsApp conversation inside a phone frame —   */
/*  same language as the hero mockup, tailored per industry.          */
/* ================================================================ */

export type ChatMessage = {
  side: "in" | "out"; // in = customer (white, left), out = business (green, right)
  text: string;
  time: string;
  booked?: boolean;
};

export default function IndustryPhone({
  contact,
  messages,
}: {
  contact: string;
  messages: ChatMessage[];
}) {
  return (
    <div
      className="relative"
      style={{
        width: 300,
        maxWidth: "100%",
        borderRadius: 42,
        padding: 10,
        background: "linear-gradient(160deg, #15171a, #0a0b0c)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 40px 80px -40px rgba(0,0,0,0.8)",
      }}
    >
      {/* screen */}
      <div style={{ position: "relative", borderRadius: 34, overflow: "hidden", background: "#EFEAE2" }}>
        {/* dynamic island */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 10,
            left: "50%",
            transform: "translateX(-50%)",
            width: 96,
            height: 26,
            borderRadius: 16,
            background: "#000",
            zIndex: 20,
          }}
        />

        {/* WhatsApp header */}
        <div className="flex items-center gap-2.5" style={{ background: "#075E54", padding: "30px 12px 10px" }}>
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none" aria-hidden>
            <path d="M9 1L1 8L9 15" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#cfd8dc", flexShrink: 0, overflow: "hidden" }}>
            <svg width="34" height="34" viewBox="0 0 36 36" aria-hidden>
              <circle cx="18" cy="14" r="6" fill="#9aa7ad" />
              <path d="M6 32c0-6.6 5.4-11 12-11s12 4.4 12 11" fill="#9aa7ad" />
            </svg>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#fff", lineHeight: 1.2 }}>{contact}</p>
            <p style={{ margin: 0, fontSize: 10.5, color: "rgba(255,255,255,0.7)" }}>online</p>
          </div>
          <div style={{ display: "flex", gap: 14, color: "#fff" }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" />
            </svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6a1 1 0 0 0-1 .2l-2.2 2.2a15 15 0 0 1-6.6-6.6l2.2-2.2a1 1 0 0 0 .2-1C8.7 6.5 8.5 5.3 8.5 4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1 17 17 0 0 0 17 17 1 1 0 0 0 1-1v-3.5a1 1 0 0 0-1-1Z" />
            </svg>
          </div>
        </div>

        {/* chat body */}
        <div
          style={{
            padding: "14px 10px",
            display: "flex",
            flexDirection: "column",
            gap: 7,
            minHeight: 320,
            background:
              "#EFEAE2 url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cg fill='%23d9cfc0' fill-opacity='0.35'%3E%3Ccircle cx='6' cy='6' r='1'/%3E%3Ccircle cx='26' cy='18' r='1'/%3E%3Ccircle cx='14' cy='30' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
          }}
        >
          {messages.map((m, i) => {
            const out = m.side === "out";
            return (
              <div key={i} style={{ display: "flex", justifyContent: out ? "flex-end" : "flex-start" }}>
                <div
                  style={{
                    maxWidth: "82%",
                    background: m.booked ? "#D9FDD3" : out ? "#DCF8C6" : "#fff",
                    borderRadius: out ? "8px 0 8px 8px" : "0 8px 8px 8px",
                    padding: "6px 9px 5px",
                    boxShadow: "0 1px 0.5px rgba(0,0,0,0.13)",
                  }}
                >
                  <p style={{ margin: 0, fontSize: 12.5, color: "#111b21", lineHeight: 1.4, fontWeight: m.booked ? 600 : 400 }}>
                    {m.text}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 3, marginTop: 2 }}>
                    <span style={{ fontSize: 9.5, color: "#667781" }}>{m.time}</span>
                    {out && (
                      <svg width="14" height="9" viewBox="0 0 15 9" fill="none" aria-hidden>
                        <path d="M1 4.5L3.6 7L8.4 1.5" stroke="#53BDEB" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6 4.5L8.6 7L13.4 1.5" stroke="#53BDEB" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* input bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 8px 12px", background: "#F0F0F0" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", background: "#fff", borderRadius: 22, padding: "7px 12px" }}>
            <span style={{ fontSize: 12, color: "#8696a0" }}>Message</span>
          </div>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#00A884", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="16" viewBox="0 0 12 14" fill="none" aria-hidden>
              <rect x="3.5" y="0.5" width="5" height="7.5" rx="2.5" fill="#fff" />
              <path d="M1 7C1 9.76 3.24 12 6 12C8.76 12 11 9.76 11 7" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
              <line x1="6" y1="12" x2="6" y2="13.5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
