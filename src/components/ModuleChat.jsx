import React, { useEffect, useState, useRef } from "react";
import { supabase } from "../supabase.js";

const ModuleChat = ({ moduleCode }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("Anon");
  const chatContainerRef = useRef(null);

  // Fetch current user's username from profiles
  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", user.id)
          .single();
        if (data && data.username) setUsername(data.username);
      }
    };
    fetchProfile();
  }, []);

  // Debug: Log when component mounts and moduleCode changes
  useEffect(() => {
    console.log("ModuleChat mounted for", moduleCode);
  }, [moduleCode]);

  useEffect(() => {
    if (!moduleCode) return;
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("module_chats")
        .select("*")
        .eq("module_code", moduleCode)
        .order("created_at", { ascending: true });
      if (error) {
        console.error("Error fetching messages:", error);
      }
      setMessages(data || []);
    };
    fetchMessages();

    // Real-time updates (optional)
    const channel = supabase
      .channel('module_chats')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'module_chats', filter: `module_code=eq.${moduleCode}` },
        payload => setMessages(msgs => [...msgs, payload.new])
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [moduleCode]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0;
    }
    console.log("Fetched messages for", moduleCode, messages);
  }, [messages, moduleCode]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const { error } = await supabase.from("module_chats").insert({
      module_code: moduleCode,
      message: input.trim(),
      created_at: new Date().toISOString(),
      username: username,
      // Optionally add user_id, etc.
    });
    if (error) {
      console.error("Error sending message:", error);
    }
    setInput("");
  };

  return (
    <div style={{ background: "#181c2f", borderRadius: 8, padding: 12, marginBottom: 16, width: "100%" }}>
      <div style={{ marginBottom: 8, color: "#f7c873" }}>
        <b>Chat for module: {moduleCode}</b>
      </div>
      <div
        ref={chatContainerRef}
        style={{ maxHeight: 180, overflowY: "auto", marginBottom: 8 }}
      >
        {messages.map(msg => (
          <div key={msg.id} style={{ margin: "4px 0", color: "#fffbe6" }}>
            <b>{msg.username || "Anon"}:</b> {msg.message}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={`Type a message as ${username}...`}
          style={{ flex: 1, borderRadius: 4, border: "1px solid #353a5a", padding: 8, background: "#232946", color: "#fffbe6" }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>Send</button>
      </form>
    </div>
  );
};

export default ModuleChat;