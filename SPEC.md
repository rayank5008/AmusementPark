# TARGET: today's build

Choose the idea, person, interaction, and visual direction. The agent can help phrase and save your decisions after you approve them. The provided scope and review safeguards stay in place.

- **Thing:** A one-page California amusement park recommender. Visitors select ride interests—such as roller coasters, drop towers, or merry-go-rounds—and a thrill preference, then see matching California parks with clear reasons.
- **Audience:** Teenagers choosing an amusement park with friends who want rides that suit their interests and comfort level.
- **Requirements:** One working primary interaction: select preferences and get recommendations from a small, curated park list. Clearly show selected preferences, matching rides, and understandable results, including when nothing matches. Honor the standing rule in AGENTS.md.
- **Guardrails:** Static browser code. No required external service, keys, accounts, runtime AI, or private data. Label fictional or sample content. Source factual ride claims; do not imply live availability or safety guarantees. Preserve the example and publishing setup. Work on a branch and wait for human review before shipping.
- **Experience:** A colorful, polished design with a deep navy background and coral, lavender, and aqua accents. A brief roller-coaster entrance animation creates excitement, followed by purposeful selection and result transitions. Keep controls easy to use, text readable, and animations reduced or disabled when reduced motion is preferred; avoid perpetual motion.
- **Test:** Select ride interests and complete the recommendation action. Check that “Gentle rides only” follows the standing rule, test a combination with no matches, and verify one factual ride claim against its source. After I approve and merge, the same registered Pages URL works.

The coastal example has a [completed TARGET](examples/coast/SPEC.md). It demonstrates the format, not a required topic.
