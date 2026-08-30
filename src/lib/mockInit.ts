// Client-only helper — no longer seeds dummy leaderboard data.
// Leaderboard starts empty until real players submit scores via the game.
export function seedMocks() {
  if (typeof window === "undefined") return;
  // intentionally left empty — no dummy data
}
