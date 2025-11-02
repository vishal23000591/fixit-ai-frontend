import { useState, useRef, useEffect } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("https://fixit-ai-76vm.onrender.com/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages([...newMessages, { sender: "bot", text: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        { sender: "bot", text: "Error contacting AI." },
      ]);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) sendMessage();
  };

  const styles = {
    chatContainer: {
      width: "95%",
      maxWidth: "800px",
      height: "85vh",
      background: "#ffffff",
      borderRadius: "16px",
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.12)",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      animation: "slideUp 0.6s ease-out",
      fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
    },

    chatMessages: {
      flexGrow: 1,
      overflowY: "auto",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      scrollBehavior: "smooth",
      backgroundColor: "#fafafa",
      gap: "15px",
    },

    chatMessage: {
      maxWidth: "80%",
      padding: "14px 18px",
      borderRadius: "14px",
      lineHeight: 1.6,
      wordWrap: "break-word",
      fontSize: "15px",
      position: "relative",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      transition: "all 0.3s ease",
      textAlign: "left", // ✅ Left align all text
    },

    userMessage: {
      alignSelf: "flex-end",
      background: "linear-gradient(135deg, #4361ee, #3f37c9)",
      color: "white",
      borderBottomRightRadius: "6px",
      marginLeft: "auto",
    },

    botMessage: {
      alignSelf: "flex-start",
      background: "#ffffff",
      border: "1px solid #e9ecef",
      color: "#2b2d42",
      borderBottomLeftRadius: "6px",
      marginRight: "auto",
    },

    // Add HTML formatting styles for bot messages
    botMessageContent: {
      textAlign: "left",
      lineHeight: "1.7",
    },

    chatInput: {
      padding: "20px",
      background: "#ffffff",
      borderTop: "1px solid #e9ecef",
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },

    input: {
      flexGrow: 1,
      padding: "14px 18px",
      border: "2px solid #e9ecef",
      borderRadius: "50px",
      fontSize: "15px",
      outline: "none",
      background: "#f8f9fa",
    },

    button: {
      padding: "14px 24px",
      background: "linear-gradient(135deg, #4361ee, #3f37c9)",
      color: "white",
      border: "none",
      borderRadius: "50px",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
      boxShadow: "0 4px 12px rgba(67, 97, 238, 0.3)",
    },

    animations: `
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(40px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .bot-message p {
        margin: 0 0 10px 0;
        line-height: 1.6;
      }

      .bot-message strong {
        font-weight: 600;
        color: #1d3557;
        display: block;
        margin-bottom: 5px;
      }

      .bot-message ul {
        margin-left: 20px;
        padding-left: 10px;
        list-style-type: disc;
      }

      .bot-message li {
        margin-bottom: 5px;
      }
    `,
  };

  const getMessageStyle = (sender) => ({
    ...styles.chatMessage,
    ...(sender === "user" ? styles.userMessage : styles.botMessage),
  });

  return (
    <>
      <style>{styles.animations}</style>
      <div style={styles.chatContainer}>
        <div style={styles.chatMessages} className="custom-scrollbar">
          {messages.map((msg, i) => (
            <div
              key={i}
              style={getMessageStyle(msg.sender)}
              className={msg.sender === "bot" ? "bot-message" : ""}
            >
              <div
                style={msg.sender === "bot" ? styles.botMessageContent : {}}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            </div>
          ))}

          {loading && (
            <div style={styles.botMessage}>
              <em>Bot is typing...</em>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div style={styles.chatInput}>
          <input
            style={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            style={styles.button}
            disabled={loading}
          >
            {loading ? "⏳" : "📤"} Send
          </button>
        </div>
      </div>
    </>
  );
}
