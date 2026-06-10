# Sabre Red Workspace

---

## The Problem

Sabre Red Workspace ran on a command line. Agents typed cryptic strings to search flights, book hotels, pull pricing. Proficiency took weeks. Mastery took months.

Flightcentre hires seasonally. A lot of their agents arrive with no travel industry background at all. That ramp time was a real cost — and they were leaving hotel revenue on the table because agents weren't surfacing it.

They put the platform out to bid. Build something new agents can learn fast, without taking the power away from veterans who'd built careers on the command line. Win the contract, then roll it out without a productivity dip.

---

## My Role

I was an individual contributor on the design team that owned this redesign. After the product vision phase, we split across feature areas and worked in parallel.

I owned Hotel booking. Hotel had the highest profit margins in the business and had been functionally neglected for years — the right feature to go deep on. I also ran workshops throughout the project, including a Buy a Feature session at an industry conference with dozens of active agents.

---

## The Users

Veterans had been typing command strings for years. Their speed was real. They could outrun any graphical interface and they knew it. Slow them down and they'd reject the tool — loudly, and with justification.

Seasonal hires arrived with no industry background, learning under pressure during peak booking periods. The command line was a foreign language with no dictionary.

One tool, two users with opposite needs. That was the problem we had to solve without picking a side.

---

## The Process

We started with weeks of stakeholder interviews and field observation — time with agents at their desks, watching them work. Before designing anything, we built concept videos showing how the redesigned tool would look and behave. Not prototypes. Videos. The goal was alignment on direction before anyone invested in detailed design. Once the team and client were on the same page, we split into parallel feature tracks.

My Hotel research started in the field. We watched agents book hotels while on the phone with clients. What we kept seeing: agents leaving the tool mid-call to look things up on Expedia and Hotels.com. Not because the information didn't exist — because it wasn't in the system. Property photos. Room amenities. Neighborhood details. The exact things a client asks about while they're still deciding.

I pulled usage analytics on hotel commands to understand what agents actually did versus what we assumed they did. I also dug into the underlying XML data structures to find out what information the system held but wasn't surfacing. There was a lot of it.

To prioritize v1.0 scope, I ran a Buy a Feature workshop at an industry conference. Agents spent a fictional budget to rank features — it forces tradeoffs that interviews don't, and gives you a defensible hierarchy for the hard scope conversations.

---

## The Key Decision: Hybrid, Not Migration

Some stakeholders wanted a full graphical redesign. Deprecate the command line, move everyone over, done.

The research said no. Veterans weren't giving up the keyboard. Their resistance would be real and their reasons would be valid. Force a migration and you lose your most experienced users right when you're trying to prove a productivity-neutral rollout.

We built a hybrid instead: an updated command interface for veterans, a fully graphical mode for everyone else. Move between them freely. Neither treated as the backup option.

For Hotel, the key call was simpler: don't invent a new layout. Agents already knew how Expedia and Hotels.com were structured — photos up top, amenities in a scannable list, location on a map. We used that framework. Same mental model, no relearning required.

Then we brought everything they'd been tab-switching out to find — photos, room-level images, videos, maps, neighborhood context — inside the tool. An agent could answer every client question without leaving the screen.

---

## What Was Hard

Every time we made the graphical interface more discoverable, we risked slowing down a veteran who'd already internalized the keyboard path. We tested constantly with both user types and there was no clean resolution — just ongoing calibration between two legitimate sets of needs.

Hotel was also the most technically constrained area on the project. Getting to what was actually buildable meant reading XML schemas and working closely with engineering before the design work could move. That wasn't in the original scope of what I thought I was signing up for. It was necessary.

And the whole thing had a hard deadline tied to a live contract bid. There was no flexibility on v1.0.

---

## Outcomes

Sabre won the Flightcentre contract — worth $1B.

The rollout completed six months ahead of the original two-year timeline. Flightcentre reported zero productivity loss during the transition — the proof that the hybrid approach had actually worked.

After rollout, Flightcentre saw a 23% jump in revenue. Total Transaction Volume across the platform increased 8.7% in the first year, a gain of over $800M across flights, hotels, and cars.

---

## What I'd Do Differently

Watching agents tab out to Expedia mid-call was the most clarifying moment in the Hotel research. It told us more about the gaps in the tool than months of interviews had. I'd push for that kind of in-context observation earlier — across every feature area, not just the one I owned.

The product vision video aligned stakeholders fast. It also locked us into a direction before the feature-level research was complete. I'd want more explicit checkpoints between the vision phase and parallel development — places to surface where the detailed work was diverging from what the video had implied.
