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
      img: "281d1bdf-fbde-4551-cf8f-973274e5be00",
      samary: `Get UGX 100 Free Bet for each friend! Share your unique referral link — when your friend signs up, deposits UGX 49+, and plays at least 3 Aviator rounds (1.5x multiplier, UGX 49+ total stake), you get a UGX 100 Aviator Free Bet instantly.`,
    },
    // {
    //   id: 211333,
    //   name: bethubPromo,
    //   routeName: "share-bets",
    //   title: "Share & Win Together!",
    //   img: "281d1bdf-fbde-4551-cf8f-973274e5be00",
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
    //   img: "7056ec80-7903-4c44-fd42-b6d9ef8a7900",
    //   samary: `Climb the ranks and claim your share of UGX 300,000 every week!`,
    // },
    {
      id: 211336345453,
      name: tanoSupuuPromo,
      routeName: "home",
      title:
        "Bet 5 days in a row and earn your UGX 50 streak bonus every Monday.",
      img: "139fc218-facc-4e16-2fa1-d74249e69200",
      samary: `Place 1 qualifying bet daily, keep the streak alive, get rewarded.`,
    },
    {
      id: 211336345,
      name: aviatorKaribuBonus,
      routeName: "aviator",
      title: "7bet Aviator Karibu Bonus.",
      img: "fbc171c6-2b48-4894-69d7-1fc8503bb900",
      samary: `Register today and get up to 50 FREE Aviator Bets!
  ✅ Create an account
  ✅ Make your first deposit
  ✅ Enjoy free 7bet Aviator Bets Instantly
  `,
    },
    //     {
    //       id: 2113384545646656,
    //       name: aviatorWelcomeBonus,
    //       routeName: "aviator",
    //       title: "✈️ Aviator Welcome Bonus!",
    //       img: "e4360cc3-9679-4afe-be71-4230d1cd9100",
    //       samary: `Welcome to 7bet! We’re excited to offer new players an incredible opportunity to explore one of our most popular games with minimal risk and maximum potential rewards.
    // Exclusive New Player Benefit: Earn up to 25 free bets worth UGX 10 each on Aviator during your first 5 days after registration - that’s a total value of UGX 250 in free gameplay!
    // `,
    //     },
    {
      id: 17700113,
      name: cashbackPromo,
      routeName: "deposit",
      title: "DEPOSIT BONUS",
      img: "cb024ecf-813f-49a3-b2f1-b4b8d902ea00",
      samary: `7bet provides a daily bonus to customers for their first deposit(s) of the day. This bonus
effectively refunds either the full or partial transaction charges, rewarding customers for their
deposits. `,
    },
    // {
    //   id: 21133634545,
    //   name: jengaBetsPromo,
    //   routeName: "home",
    //   title: "7bet Jenga Bet.",
    //   img: "3fd82dc9-8b20-4e22-0a3d-3aec7edaaf00",
    //   samary: `7bet Jenga Bet lets you create your own customized football bet just the way you like it! Choose from the most popular football markets and combine them into a single bet — with your odds automatically calculated as you go.`,
    // },
    {
      id: 2,
      name: aviatorPromo,
      routeName: "aviator",
      title: "7BET AVIATOR FREE RAINS",
      img: "e4360cc3-9679-4afe-be71-4230d1cd9100",
      samary: `7bet Aviator Rains Promotion offers Aviator players a daily opportunity to win over UGX
200,000 in free bets.`,
    },
    {
      id: 211336,
      name: multibetBoostPromo,
      routeName: "home",
      title: "Multibet Boost - Supercharge Your Wins!",
      img: "61cf0568-fb3c-4bf5-83cf-cc7bd2eadb00",
      samary: `Maximize Your Winning Potential with 7bet’ exclusive Multibet Boost!
        Combine multiple selections and watch your winnings grow with our tiered boost system that rewards bigger combinations with even bigger returns.`,
    },
    {
      id: 21133845456,
      name: twoUpPromo,
      routeName: "home",
      title: " 2UP – Get Paid in Full When Your Team Goes 2 Goals Up",
      img: "d22c9527-0184-4992-e2ab-ca3908fd5f00",
      samary: `Experience football betting without the heartbreak of late comebacks! With 7bet 2UP, when your team takes a 2-goal lead, we pay out in full instantly – no waiting, no reduced odds.`,
    },
    {
      id: 2113384545646,
      name: oneCutPromo,
      routeName: "home",
      title: "🏆Miss One, Still Win Cash Back!",
      img: "c6faea7f-4a5b-4488-8909-c706a59c6000",
      samary: `Experience smarter betting with 7bet One Cut! Even the best bettors can have one selection let them down. That’s why we created the ultimate safety net – when your multibet falls short by just one game, you still win real cash back.`,
    },
    {
      id: 2113384545646656,
      name: dailyAviatorCashback,
      routeName: "aviator",
      title: "✈️ Daily Aviator Cashback - Surprise Rewards for Loyal Players!",
      img: "ba66e76d-301e-4deb-5584-75d0912cb900",
      samary: `Experience Aviator like never before with 7bet Daily Cashback! Every day, our system randomly rewards loyal Aviator players with surprise cash back on their losses. The more you play, the better your chances of being selected for our exclusive daily rewards program.`,
    },

    // {
    //   id: 211333,
    //   name: bethubPromo,
    //   routeName: "share-bets",
    //   title: "Share & Win Together!",
    //   img: "281d1bdf-fbde-4551-cf8f-973274e5be00",
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
      img: "d6186ed2-001f-4a0c-81a4-9af8e4572d00",
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
      img: "/promos/aviator-karibu-promo.png",
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
      img: "/promos/freebets-prom.png",
      bg: "bg-linear-to-r from-red-700 to-red-800",
      samary: `Earn up to 25 free bets worth UGX 10 each on Aviator during your first 5 days after registration!`,
    },
    {
      id: 17700113,
      name: cashbackPromo,
      routeName: "deposit",
      title: "DEPOSIT BONUS",
      img: "9997c588-7093-4c36-1ebd-03349a9dda00",
      bg: "bg-linear-to-r from-red-700 to-purple-800",
      samary: `7bet provides a daily bonus to customers for their first deposit(s) of the day.`,
    },
    {
      id: 0,
      name: pariLeaguePromo,
      routeName: "pari-league",
      title: "PariLeague Freebets",
      img: "/promos/hakiligipromo.png",
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
      img: "/promos/cashback-prom.png",
      samary: `Every day, our system randomly rewards loyal Aviator players with surprise cash back on their losses. The more you play, the better your chances of being selected for our exclusive daily rewards program.`,
    },
    {
      id: 2,
      name: aviatorPromo,
      routeName: "aviator",
      title: "7BET AVIATOR FREE RAINS",
      img: "/promos/aviator_rain.png",
      bg: "bg-linear-to-l from-sky-700 to-purple-800",
      samary: `7bet Aviator Rains Promotion offers Aviator players a daily opportunity to win over UGX
200,000 in free bets.`,
    },
    {
      id: 211336,
      name: multibetBoostPromo,
      routeName: "home",
      title: "Multibet Boost - Supercharge Your Wins!",
      img: "/promos/multiboost-prom.png",
      bg: "bg-linear-to-r from-cyan-700 to-red-800",
      samary: `Maximize Your Winning Potential with 7bet' exclusive Multibet Boost! 
        Combine multiple selections and watch your winnings grow with our tiered boost system that rewards bigger combinations with even bigger returns.`,
    },
    {
      id: 21133845456,
      name: twoUpPromo,
      routeName: "home",
      title: " 2UP – Get Paid in Full When Your Team Goes 2 Goals Up",
      img: "/promos/two-up-prom.png",
      bg: "bg-linear-to-r from-fuchsia-700 to-pink-800",
      samary: `Experience football betting without the heartbreak of late comebacks! With 7bet 2UP, when your team takes a 2-goal lead, we pay out in full instantly – no waiting, no reduced odds.`,
    },
    {
      id: 2113384545646,
      name: oneCutPromo,
      routeName: "home",
      title: "🏆Miss One, Still Win Cash Back!",
      img: "/promos/onecut-prom.png",
      bg: "bg-linear-to-r from-amber-700 to-blue-800",
      samary: `Experience smarter betting with 7bet One Cut! Even the best bettors can have one selection let them down. That’s why we created the ultimate safety net – when your multibet falls short by just one game, you still win real cash back.`,
    },

    {
      id: 211333,
      name: bethubPromo,
      routeName: "share-bets",
      title: "Share & Win Together!",
      img: "ca999c4c-366c-4f8b-2ea3-55d06ca48600",
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
