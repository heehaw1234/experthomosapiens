import React, { useEffect, useState } from "react";
import { supabase } from "../supabase.js";
import Card from "../components/Card";
import ModSearchBar from "../components/ModSearchBar";
import ModuleChat from "../components/ModuleChat";

const CardsByModule = () => {
  const [cardsByModule, setCardsByModule] = useState({});
  const [searchModule, setSearchModule] = useState("");

  // Fetch cards, optionally filtered by module code
  const fetchCards = async (modInput = "") => {
    let query = supabase.from("cards").select("*");
    if (modInput.trim() !== "") {
      query = query.eq("module_code", modInput.toUpperCase());
    }
    const { data, error } = await query;
    if (error) return;
    const grouped = {};
    data.forEach(card => {
      if (!grouped[card.module_code]) grouped[card.module_code] = [];
      grouped[card.module_code].push(card);
    });
    setCardsByModule(grouped);
  };

  // Initial fetch and whenever searchModule changes
  useEffect(() => {
    fetchCards(searchModule);
    // eslint-disable-next-line
  }, [searchModule]);

  // Separate null/undefined modules from others
  const entries = Object.entries(cardsByModule);
  const nonNullModules = entries.filter(([module]) => module && module !== "null" && module !== "undefined");
  const nullModules = entries.filter(([module]) => !module || module === "null" || module === "undefined");

  // Handler for ModSearchBar
  const handleModuleSearch = (modInput) => {
    setSearchModule(modInput);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <ModSearchBar fetchCards={handleModuleSearch} />
      {entries.length === 0 && <p>No cards found.</p>}
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {[...nonNullModules, ...nullModules].map(([module, cards]) => (
          <div
            key={module || "null-module"}
            style={{
              background: "#232946",
              borderRadius: "16px",
              boxShadow: "0 2px 12px #23294622",
              padding: "1.5rem",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <h3 style={{ color: "#f7c873", marginBottom: "1rem" }}>
              {module || "None"}
            </h3>
            {/* Add chat for valid modules */}
            {module && module !== "null" && module !== "undefined" && (
              <ModuleChat moduleCode={module} />
            )}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1.5rem",
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              {cards.map(card => (
                <Card
                  key={card.id}
                  id={card.id}
                  title={card.title}
                  url={card.url}
                  type={card.type}
                  likeCount={card.like_count}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsByModule;