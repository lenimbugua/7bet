export function usePromos() {
  const aviatorPromo = "aviator";
  const pariLeaguePromo = "hakiLeague";
  const cashbackPromo = "cashback";
  const bethubPromo = "bethub";

  const multibetBoostPromo = "multibet-boost";
  const twoUpPromo = "two-up";
  const oneCutPromo = "one-cut";
  const dailyAviatorCashback = "daily-aviator-cashback";
  const aviatorWelcomeBonus = "aviator-welcome-bonus";
  const aviatorKaribuBonus = "aviator-karibu-bonus";
  const jengaBetsPromo = "jenga-bets";
  const tanoSupuuPromo = "tano-supuu";
  const sambazaZaKrisiiPromo = "sambaza-za-krisii";
  const leaderboardPromo = "leaderboard";
  const aviatorInviteFriends = "invite-friends";

  const promos = [
    {
      id: 211333999,
      name: aviatorInviteFriends,
      routeName: "aviator",
      title: "Invite Friends & Earn UGX 100 Free Bet",
      img: "/promos/promo-placeholder.jpg",
      samary: `Get UGX 100 Free Bet for each friend! Share your unique referral link — when your friend signs up, deposits UGX 49+, and plays at least 3 Aviator rounds (1.5x multiplier, UGX 49+ total stake), you get a UGX 100 Aviator Free Bet instantly.`,
    },
    // {
    //   id: 211333,
    //   name: bethubPromo,
    //   routeName: "share-bets",
    //   title: "Share & Win Together!",
    //   img: "/promos/promo-placeholder.jpg",
    //   samary: `Boost Your Bets with Shared Luck! Load, Bet, Celebrate – Faster Than Ever!
    //   Unlock Bigger Wins – Team up and multiply your chances with Shared Luck!
    //   Instant Thrills – Load, place your bet, and enjoy lightning-fast results!
    //   More Bets, More Fun – Join forces and watch your rewards grow together!`,
    // },
    // {
    //   id: 278394453425,
    //   routeName: "leaderboard",
    //   name: leaderboardPromo,
    //   title: "7BET WEEKLY LEADERBOARD",
    //   img: "/promos/promo-placeholder.jpg",
    //   samary: `Climb the ranks and claim your share of UGX 300,000 every week!`,
    // },
    {
      id: 211336345453,
      name: tanoSupuuPromo,
      routeName: "home",
      title:
        "Bet 5 days in a row and earn your UGX 50 streak bonus every Monday.",
      img: "/promos/promo-placeholder.jpg",
      samary: `Place 1 qualifying bet daily, keep the streak alive, get rewarded.`,
    },
    {
      id: 211336345,
      name: aviatorKaribuBonus,
      routeName: "aviator",
      title: "Register, Fly & Get Up to 25 Aviator Free Bets!",
      img: "/promos/promo-placeholder.jpg",
      samary: `Earn up to 25 Free Bets worth UGX 2,000 each over your first 5 days after joining 7bet — a total promotional value of UGX 50,000!`,
      description: `
        <h2>Register, Fly &amp; Get Up to 25 Aviator Free Bets!</h2>
        <p>We are giving new players an incredible opportunity to take to the skies! Explore Aviator, our most popular crash game, with minimal risk and maximum reward potential. Earn up to <strong>25 Free Bets worth UGX 2,000 each</strong> over your first 5 days after joining 7bet! That is a total promotional value of <strong>UGX 50,000</strong>!</p>
        <h3>🕹️ How It Works</h3>
        <ol>
          <li>Place 10 qualifying bets on Aviator within a single day.</li>
          <li>Receive 5 Aviator Free Bets (worth UGX 2,000 each) credited to your account by 2:00 PM the following day.</li>
          <li>Repeat this process for up to 5 consecutive days after your registration date to claim all 25 Free Bets.</li>
        </ol>
        <h3>🎯 Qualifying Bet Criteria</h3>
        <ul>
          <li><strong>Game:</strong> Aviator only.</li>
          <li><strong>Minimum Stake:</strong> UGX 300 per flight.</li>
          <li><strong>Multiplier Condition:</strong> The bet must either be a losing bet OR successfully cashed out at a multiplier of 2.0x or higher.</li>
        </ul>
        <h3>📋 Terms and Conditions</h3>
        <ul>
          <li><strong>Eligibility:</strong> Strictly available to newly registered customers during their first 5 days from the registration date.</li>
          <li><strong>Activity:</strong> Players must actively place bets on Aviator immediately following registration to participate.</li>
          <li><strong>Free Bet Expiry:</strong> All credited Free Bets expire exactly 24 hours after issuance.</li>
          <li><strong>Payouts:</strong> Only the net winnings from the Free Bets are credited to your cash balance (the Free Bet stake is not returned). No partial qualifications are permitted.</li>
        </ul>
      `,
    },
    //     {
    //       id: 2113384545646656,
    //       name: aviatorWelcomeBonus,
    //       routeName: "aviator",
    //       title: "✈️ Aviator Welcome Bonus!",
    //       img: "/promos/promo-placeholder.jpg",
    //       samary: `Welcome to 7bet! We’re excited to offer new players an incredible opportunity to explore one of our most popular games with minimal risk and maximum potential rewards.
    // Exclusive New Player Benefit: Earn up to 25 free bets worth UGX 10 each on Aviator during your first 5 days after registration - that’s a total value of UGX 250 in free gameplay!
    // `,
    //     },
    {
      id: 17700113,
      name: cashbackPromo,
      routeName: "deposit",
      title: "100% First Deposit Welcome Bonus",
      img: "/promos/promo-placeholder.jpg",
      samary: `Kick off your 7bet journey with a massive 100% Match Bonus on your very first deposit up to UGX 1,000,000. Sign up today, double your betting power instantly, and back your favorite teams with confidence.`,
      description: `
        <h2>100% First Deposit Welcome Bonus</h2>
        <p>Experience the ultimate thrill of sports betting right from the start! Kick off your 7bet journey with a massive <strong>100% Match Bonus</strong> on your very first deposit up to <strong>UGX 1,000,000</strong>. Sign up today, double your betting power instantly, and back your favorite teams with confidence.</p>
        <h3>🚀 Get Your Bonus in 3 Easy Steps</h3>
        <ol>
          <li><strong>Register:</strong> Create your official account at 7bet Uganda.</li>
          <li><strong>Deposit:</strong> Make your very first deposit into your account.</li>
          <li><strong>Bet &amp; Receive:</strong> Place your qualifying bets, and your 100% bonus will be credited automatically.</li>
        </ol>
        <h3>📋 Terms and Conditions</h3>
        <ul>
          <li><strong>Wagering Requirement:</strong> 5x rollover of the deposit amount.</li>
          <li><strong>Bet Criteria:</strong> Minimum of 3 selections per bet slip.</li>
          <li><strong>Minimum Odds:</strong> 1.50 per individual selection.</li>
          <li><strong>Total Odds:</strong> The bet slip must have combined minimum total odds of 5.00.</li>
          <li><strong>Validity:</strong> Wagering requirements must be fully completed within 14 days of your first deposit.</li>
          <li><strong>Rollover Definition:</strong> The rollover contribution is capped at your original deposit amount per bet. For example: If you deposit UGX 5,000 and stake UGX 7,000 on a qualifying slip, UGX 5,000 will contribute toward your rollover progress.</li>
          <li><strong>How to Claim:</strong> No promo codes needed! The bonus tracks automatically once your registration and profile details are fully completed.</li>
        </ul>
      `,
    },
    // {
    //   id: 21133634545,
    //   name: jengaBetsPromo,
    //   routeName: "home",
    //   title: "7bet Jenga Bet.",
    //   img: "/promos/promo-placeholder.jpg",
    //   samary: `7bet Jenga Bet lets you create your own customized football bet just the way you like it! Choose from the most popular football markets and combine them into a single bet — with your odds automatically calculated as you go.`,
    // },
    {
      id: 2,
      name: aviatorPromo,
      routeName: "aviator",
      title: "The Aviator Daily Free Bet Rain — Claim Up to UGX 2,000,000 Daily!",
      img: "/promos/promo-placeholder.jpg",
      samary: `Play Aviator on 7bet and watch the live chat closely — random Free Bet Rains are dropping all day, every day, letting you claim your share of up to UGX 2,000,000 in daily free bets!`,
      description: `
        <h2>The Aviator Daily Free Bet Rain — Claim Up to UGX 2,000,000 Daily!</h2>
        <p>Get ready for the most rewarding downpour in Uganda! Play Aviator on 7bet and watch the live chat closely, random Free Bet Rains are dropping all day, every day, letting you claim your share of up to <strong>UGX 2,000,000 in daily free bets</strong>!</p>
        <h3>⛈️ Claim in 3 Easy Steps</h3>
        <ol>
          <li>Open and play Aviator.</li>
          <li>Keep an eye on the Live Chat area inside the Aviator game window.</li>
          <li>When the Rain appears, be the fastest player to click <strong>CLAIM</strong>!</li>
        </ol>
        <h3>📊 Free Bet Rain Tier Structure</h3>
        <p>Free Bets drop randomly throughout the day across 8 different tiers. To claim a drop, you must meet the active criteria for that specific tier:</p>
        <table>
          <thead>
            <tr>
              <th>Tier</th>
              <th>Rain Event Value</th>
              <th>Daily Drops</th>
              <th>Min. Balance Required</th>
              <th>Min. Stake Played</th>
              <th>Activity Window</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>UGX 300 Free Bet</td><td>100 Drops</td><td>UGX 300</td><td>UGX 300</td><td>Bet placed in last 5 mins</td></tr>
            <tr><td>2</td><td>UGX 600 Free Bet</td><td>90 Drops</td><td>UGX 600</td><td>UGX 600</td><td>Bet placed in last 5 mins</td></tr>
            <tr><td>3</td><td>UGX 1,000 Free Bet</td><td>80 Drops</td><td>UGX 1,000</td><td>UGX 1,000</td><td>Bet placed in last 5 mins</td></tr>
            <tr><td>4</td><td>UGX 1,500 Free Bet</td><td>60 Drops</td><td>UGX 1,500</td><td>UGX 1,500</td><td>Bet placed in last 5 mins</td></tr>
            <tr><td>5</td><td>UGX 3,000 Free Bet</td><td>40 Drops</td><td>UGX 3,000</td><td>UGX 3,000</td><td>Bet placed in last 5 mins</td></tr>
            <tr><td>6</td><td>UGX 6,000 Free Bet</td><td>80 Drops</td><td>UGX 6,000</td><td>UGX 6,000</td><td>Bet placed in last 5 mins</td></tr>
            <tr><td>7</td><td>UGX 15,000 Free Bet</td><td>20 Drops</td><td>UGX 15,000</td><td>UGX 15,000</td><td>Bet placed in last 10 mins</td></tr>
            <tr><td>8</td><td>UGX 30,000 Free Bet</td><td>20 Drops</td><td>UGX 30,000</td><td>UGX 30,000</td><td>Bet placed in last 10 mins</td></tr>
          </tbody>
        </table>
        <h3>📋 Terms and Conditions</h3>
        <ul>
          <li><strong>Claim Limit:</strong> You can claim exactly one free bet per individual Rain event.</li>
          <li><strong>Minimum Cashout:</strong> Winnings from a Free Bet can be cashed out once the flight reaches a minimum multiplier of 1.50x.</li>
          <li><strong>Expiry:</strong> Free Bets are credited instantly and must be used within 24 hours. They must be claimed within 180 minutes of appearing in the chat.</li>
          <li><strong>Winnings Formula:</strong> Cashout Winnings = (Free Bet Stake × Cashout Multiplier) − Free Bet Stake.</li>
          <li><strong>Fair Play:</strong> System errors, automated scripts, or suspicious account behavior will result in voided winnings. 7bet reserves the right to modify or pause this promotion at any time.</li>
        </ul>
      `,
    },
    {
      id: 211336,
      name: multibetBoostPromo,
      routeName: "home",
      title: "Enjoy 100% Win Boost on Your Multibets!",
      img: "/promos/promo-placeholder.jpg",
      samary: `Maximize your winning potential with 7bet's ultimate tiered boost system. The longer your bet slip, the bigger your payout bonus — all the way up to 100% extra cash on top of your regular winnings!`,
      description: `
        <h2>Enjoy 100% Win Boost on Your Multibets!</h2>
        <p>Maximize your winning potential with 7bet's ultimate tiered boost system. Turn your sports knowledge into bigger returns by combining selections. The longer your bet slip, the bigger your payout bonus—all the way up to <strong>100% extra cash</strong> on top of your regular winnings!</p>
        <h3>📈 Progressive Boost Matrix Examples</h3>
        <ul>
          <li><strong>5 Selections:</strong> Get an extra +7% Boost on your payout.</li>
          <li><strong>15 Selections:</strong> Get an extra +34% Boost for advanced multibet players.</li>
          <li><strong>30 Selections:</strong> THE CROWN JEWEL! Successfully predict 30 legs and <strong>DOUBLE YOUR WINNINGS (+100% Boost)</strong>!</li>
        </ul>
        <h3>💰 Real-World Payout Examples (Based on a UGX 3,000 Stake)</h3>
        <p><strong>Example A: 5-Selection Slip (7% Boost)</strong></p>
        <ul>
          <li>Combined Odds: 30.30</li>
          <li>Base Stake: UGX 3,000</li>
          <li>Standard Return: UGX 90,900</li>
          <li>With 7% Boost: <strong>UGX 97,263</strong> (An extra UGX 6,363 in pure cash!)</li>
        </ul>
        <p><strong>Example B: 15-Selection Slip (34% Boost)</strong></p>
        <ul>
          <li>Combined Odds: 1,250.00</li>
          <li>Base Stake: UGX 3,000</li>
          <li>Standard Return: UGX 3,750,000</li>
          <li>With 34% Boost: <strong>UGX 5,025,000</strong> (An extra UGX 1,275,000 in pure cash!)</li>
        </ul>
        <p><strong>Example C: 30-Selection Slip (100% Boost)</strong></p>
        <ul>
          <li>Combined Odds: 50,000.00</li>
          <li>Base Stake: UGX 3,000</li>
          <li>Standard Return: UGX 150,000,000</li>
          <li>With 100% Boost: 💡 <strong>UGX 300,000,000</strong> (Your winnings are completely doubled!)</li>
        </ul>
        <h3>🎯 How to Qualify</h3>
        <ul>
          <li><strong>Minimum Selections:</strong> 3 or more legs per multibet.</li>
          <li><strong>Minimum Odds per Leg:</strong> 1.30 or higher.</li>
          <li><strong>Minimum Total Slip Odds:</strong> 3.00</li>
          <li><strong>Minimum Stake:</strong> UGX 300 per bet slip.</li>
        </ul>
      `,
    },
    {
      id: 21133845456,
      name: twoUpPromo,
      routeName: "home",
      title: "2-Up Early Payout: Win Instantly When Your Team Leads By 2!",
      img: "/promos/promo-placeholder.jpg",
      samary: `The moment the team you backed goes ahead by 2 goals at any point in the match, your bet is settled as a WINNER instantly — regardless of what happens at the final whistle!`,
      description: `
        <h2>2-Up Early Payout: Win Instantly When Your Team Leads By 2!</h2>
        <p>Tired of watching your team bottle a 2-goal lead late in the second half? With 7bet's 2-Up Early Payout, the moment the team you backed goes ahead by 2 goals at any point in the match, your bet is settled as a <strong>WINNER instantly</strong>—regardless of what happens in the final whistle!</p>
        <h3>⚽ How It Works</h3>
        <ul>
          <li>If your selected team leads 2-0, 3-1, 4-2, etc., your selection is instantly paid out in full.</li>
          <li>Even if the opposing team makes a dramatic comeback and wins 3-2, your money is already safe in your wallet!</li>
        </ul>
        <h3>📋 Terms and Conditions</h3>
        <ul>
          <li><strong>Eligibility:</strong> Available to all registered 7bet Uganda players on an ongoing basis.</li>
          <li><strong>Market Restriction:</strong> Valid strictly on the 1X2 Full-Time (Match Result) market.</li>
          <li><strong>Timing:</strong> Valid for pre-match singles/multibets, as well as live bets placed before the 2-goal lead is established.</li>
          <li><strong>Settlement:</strong> Payout rules apply to goals scored during regular time only. Extra time and penalty shootouts do not trigger the early payout. The very first instance of a 2-goal lead triggers the win.</li>
          <li><strong>Exclusions:</strong> Tickets that are cashed out before a 2-goal lead occurs, voided matches, or comebacks where the team was never up by 2 goals are excluded. Runs smoothly on top-tier leagues worldwide.</li>
        </ul>
      `,
    },
    {
      id: 2113384545646,
      name: oneCutPromo,
      routeName: "home",
      title: "One-Team Cut? Get 50% Cashback!",
      img: "/promos/promo-placeholder.jpg",
      samary: `Nothing hurts more than a single team spoiling a massive multibet. If your multi-selection slip loses by exactly one team, we will refund 50% of your stake as cold cash so you can stay in the game.`,
      description: `
        <h2>One-Team Cut? Get 50% Cashback!</h2>
        <p>Nothing hurts more than a single team spoiling a massive multibet. At 7bet, we have your back! If your multi-selection slip loses by exactly one team, we will refund <strong>50% of your stake</strong> as cold cash so you can stay in the game.</p>
        <h3>🎯 Qualifying Criteria</h3>
        <ul>
          <li><strong>Eligibility:</strong> Registered 7bet Uganda customers placing cash wagers.</li>
          <li><strong>Selection Count:</strong> Your bet slip must contain 6 or more selections.</li>
          <li><strong>Odds Requirement:</strong> Each individual leg on the slip must have odds of 1.20 or higher.</li>
          <li><strong>Minimum Stake:</strong> UGX 1,500.</li>
          <li><strong>Bet Type:</strong> Pre-match sports markets only.</li>
        </ul>
        <h3>📋 Terms and Conditions</h3>
        <ul>
          <li><strong>The Rule:</strong> Exactly one team must lose on your ticket. If two or more selections lose, the slip does not qualify.</li>
          <li><strong>Maximum Cashback:</strong> The maximum refund amount is capped at UGX 300,000 per bet slip.</li>
          <li><strong>Exclusions:</strong> Bets placed using bonus funds or free bets do not qualify. Voided selections, cashed-out tickets, system bets, and same-game multiples are strictly excluded from cashback selection.</li>
        </ul>
      `,
    },
    {
      id: 2113384545646656,
      name: dailyAviatorCashback,
      routeName: "aviator",
      title: "✈️ Daily Aviator Cashback - Surprise Rewards for Loyal Players!",
      img: "/promos/promo-placeholder.jpg",
      samary: `Experience Aviator like never before with 7bet Daily Cashback! Every day, our system randomly rewards loyal Aviator players with surprise cash back on their losses. The more you play, the better your chances of being selected for our exclusive daily rewards program.`,
    },

    // {
    //   id: 211333,
    //   name: bethubPromo,
    //   routeName: "share-bets",
    //   title: "Share & Win Together!",
    //   img: "/promos/promo-placeholder.jpg",
    //   samary: `Boost Your Bets with Shared Luck! Load, Bet, Celebrate – Faster Than Ever!
    //   Unlock Bigger Wins – Team up and multiply your chances with Shared Luck!
    //   Instant Thrills – Load, place your bet, and enjoy lightning-fast results!
    //   More Bets, More Fun – Join forces and watch your rewards grow together!`,
    // },
    {
      id: 0,
      name: pariLeaguePromo,
      routeName: "pari-league",
      title: "PariLeague Freebets",
      img: "/promos/promo-placeholder.jpg",
      samary: `PariLeague Freebets is an exciting opportunity for sports enthusiasts to enjoy risk-free betting on
their favorite games. This promotion allows participants to place bets without using their own
money, giving them a chance to win big without any financial risk.`,
    },
  ];

  const welcomePromos = [
    {
      id: 211336345,
      name: aviatorKaribuBonus,
      routeName: "aviator",
      title: "7bet Aviator Karibu Bonus.",
      img: "/promos/promo-placeholder.jpg",
      bg: "bg-linear-to-r from-red-700 to-yellow-700",
      samary: `Register today and get up to 50 FREE Aviator Bets!
✅ Create an account
✅ Make your first deposit
✅ Enjoy free 7bet Aviator Bets Instantly!
`,
    },
    {
      id: 2113384545646656,
      name: aviatorWelcomeBonus,
      routeName: "aviator",
      title: "Aviator Welcome Bonus!",
      img: "/promos/promo-placeholder.jpg",
      bg: "bg-linear-to-r from-red-700 to-red-800",
      samary: `Earn up to 25 free bets worth UGX 10 each on Aviator during your first 5 days after registration!`,
    },
    {
      id: 17700113,
      name: cashbackPromo,
      routeName: "deposit",
      title: "DEPOSIT BONUS",
      img: "/promos/promo-placeholder.jpg",
      bg: "bg-linear-to-r from-red-700 to-purple-800",
      samary: `7bet provides a daily bonus to customers for their first deposit(s) of the day.`,
    },
    {
      id: 0,
      name: pariLeaguePromo,
      routeName: "pari-league",
      title: "PariLeague Freebets",
      img: "/promos/promo-placeholder.jpg",
      bg: "bg-linear-to-l from-red-700 to-purple-800",
      samary: `This promotion allows participants to place bets without using their own
money.`,
    },
    {
      id: 2113384545646656,
      name: dailyAviatorCashback,
      routeName: "aviator",
      title: "Daily Aviator Cashback - Surprise Rewards for Loyal Players!",
      bg: "bg-linear-to-r from-rose-700 to-emerald-800",
      img: "/promos/promo-placeholder.jpg",
      samary: `Every day, our system randomly rewards loyal Aviator players with surprise cash back on their losses. The more you play, the better your chances of being selected for our exclusive daily rewards program.`,
    },
    {
      id: 2,
      name: aviatorPromo,
      routeName: "aviator",
      title: "7BET AVIATOR FREE RAINS",
      img: "/promos/promo-placeholder.jpg",
      bg: "bg-linear-to-l from-sky-700 to-purple-800",
      samary: `7bet Aviator Rains Promotion offers Aviator players a daily opportunity to win over UGX
200,000 in free bets.`,
    },
    {
      id: 211336,
      name: multibetBoostPromo,
      routeName: "home",
      title: "Multibet Boost - Supercharge Your Wins!",
      img: "/promos/promo-placeholder.jpg",
      bg: "bg-linear-to-r from-cyan-700 to-red-800",
      samary: `Maximize Your Winning Potential with 7bet' exclusive Multibet Boost! 
        Combine multiple selections and watch your winnings grow with our tiered boost system that rewards bigger combinations with even bigger returns.`,
    },
    {
      id: 21133845456,
      name: twoUpPromo,
      routeName: "home",
      title: " 2UP – Get Paid in Full When Your Team Goes 2 Goals Up",
      img: "/promos/promo-placeholder.jpg",
      bg: "bg-linear-to-r from-fuchsia-700 to-pink-800",
      samary: `Experience football betting without the heartbreak of late comebacks! With 7bet 2UP, when your team takes a 2-goal lead, we pay out in full instantly – no waiting, no reduced odds.`,
    },
    {
      id: 2113384545646,
      name: oneCutPromo,
      routeName: "home",
      title: "🏆Miss One, Still Win Cash Back!",
      img: "/promos/promo-placeholder.jpg",
      bg: "bg-linear-to-r from-amber-700 to-blue-800",
      samary: `Experience smarter betting with 7bet One Cut! Even the best bettors can have one selection let them down. That’s why we created the ultimate safety net – when your multibet falls short by just one game, you still win real cash back.`,
    },

    {
      id: 211333,
      name: bethubPromo,
      routeName: "share-bets",
      title: "Share & Win Together!",
      img: "/promos/promo-placeholder.jpg",
      bg: "bg-linear-to-r from-yellow-700 to-teal-800",
      samary: `Boost Your Bets with Shared Luck! Load, Bet, Celebrate – Faster Than Ever!
      Unlock Bigger Wins – Team up and multiply your chances with Shared Luck!
      Instant Thrills – Load, place your bet, and enjoy lightning-fast results!
      More Bets, More Fun – Join forces and watch your rewards grow together!`,
    },
  ];

  return {
    aviatorPromo,
    pariLeaguePromo,
    multibetBoostPromo,
    dailyAviatorCashback,
    aviatorWelcomeBonus,
    aviatorKaribuBonus,
    cashbackPromo,
    twoUpPromo,
    bethubPromo,
    oneCutPromo,
    promos,
    welcomePromos,
    jengaBetsPromo,
    tanoSupuuPromo,
    sambazaZaKrisiiPromo,
    leaderboardPromo,
    aviatorInviteFriends,
  };
}
