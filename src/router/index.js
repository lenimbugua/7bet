import { useHead } from "@unhead/vue";
import { storeToRefs } from "pinia";

import { createRouter, createWebHistory } from "vue-router";

import { useModalTypes } from "../composables/useModalTypes.js";
import { useOrganizationSchema } from "../composables/useOrganizationSchema.js";
import { useLoginStore } from "../stores/login.js";
import { useModalStore } from "../stores/modal.js";
import { useUtmStore } from "../stores/utm.js";

import ForgotPassword from "../components/ForgotPassword.vue";
import VerifyAccount from "../components/VerifyAccount.vue";
// import InstantIndex from "../components/instant/InstantIndex.vue";
// import InstantLive from "../components/instant/InstantLive.vue";
import ProfileIndex from "../components/profile/ProfileIndex.vue";
import BetDetails from "../views/BetDetails.vue";
import CasinoGame from "../views/CasinoGame.vue";
import ChangePassword from "../views/ChangePassword.vue";
import CountryView from "../views/CountryView.vue";
import CrashIndex from "../views/CrashIndex.vue";
// import CrashIndex2 from "../views/CrashIndex2.vue";
import DepositFunds from "../views/DepositFunds.vue";
import JoinAffiliate from "../views/JoinAffiliate.vue";
import LeaguesView from "../views/LeaguesView.vue";
import LoginView from "../views/LoginView.vue";
import PrivacyPolicy from "../views/PrivacyPolicy.vue";
import ResetPassword from "../views/ResetPassword.vue";
import ResponsibleGambling from "../views/ResponsibleGambling.vue";
import SortDeposit from "../views/SortDeposit.vue";
import TermsAndConditions from "../views/TermsAndConditions.vue";
import TheAuth from "../views/TheAuth.vue";
import TheAviator from "../views/TheAviator.vue";
import TheBets from "../views/TheBets.vue";
import TheCasino from "../views/TheCasino.vue";
import TheLanding from "../views/TheLanding.vue";
// import TheLive from "../views/TheLive.vue";
import TheNewGames from "../views/TheNewGames.vue";
import ThePromotions from "../views/ThePromotions.vue";
import TheSignup from "../views/TheRegister.vue";
// import TheSports from "../views/TheSports.vue";
import VirtualsIndex from "../views/VirtualsIndex.vue";
// import VirtualsIndex2 from "../views/VirtualsIndex2.vue";
import WithdrawFunds from "../views/WithdrawFunds.vue";
import WithSibarAndBetslip from "../views/WithSibarAndBetslip.vue";

import ShareAnIdea from "../components/ShareAnIdea.vue";
import BookedBets from "../views/BookedBets.vue";
import HakiLeague from "../views/HakiLeague.vue";
import KironLiteIndex from "../views/KironLiteIndex.vue";
import PlayonGame from "../views/PlayonGame.vue";
import PromotionDetails from "../views/PromotionDetails.vue";
// import PromotionDetails from "@/components/promos/PromotionDetails.vue";
import BetPlacedSuccessfully from "../views/BetPlacedSuccessfully.vue";
import MatchDetails from "../views/MatchDetails.vue";
import NewLive from "../views/NewLive3.vue";
// import CasinoGames from "../views/CasinoGames.vue";
import AllGames from "../components/AllGames.vue";
import CasinoLayout from "../views/CasinoLayout.vue";
import CrashGames from "../views/CrashGames.vue";
import SelfExclusion from "../views/SelfExclusion.vue";
// import SportView from "../views/SportView.vue";

// import NewLeague from "../views/NewLeague.vue";
import BonusPage from "../views/BonusPage.vue";
import CasinoHome from "../views/CasinoHome.vue";
// import LeaderBoard from "../views/LeaderBoard.vue";
import NotFound from "../views/NotFound.vue";
import WelcomePromotions from "../views/welcome/WelcomePromotions.vue";
// import LeaderBoard2 from "../views/LeaderBoard2.vue";
// import TheVirtual from "../views/TheVirtual.vue";
export const routes = [
  {
    path: "/",
    name: "home",
    component: TheLanding,
    meta: {
      title: "Best online sports betting in Uganda– 7bet",
      description:
        "Experience the best online sports betting and casino games with 7bet. Fast payouts, live odds, and instant deposits.",
      requiresAuth: false,
    },
  },
//   {
//     path: "/",
//     name: "home",
//     component: TheLanding,
//     meta: {
//       title: "Best online sports betting in Uganda– 7bet",
//       description:
//         "Experience the best online sports betting and casino games with 7bet. Fast payouts, live odds, and instant deposits.",
//       requiresAuth: false,
//     },
//   },
  //   {
  //     path: "/home",
  //     name: "home-page",
  //     component: HomePage,
  //     meta: {
  //       title: "7bet Uganda | Official Sports Betting & Casino Platform",
  //       description:
  //         "Bet on football, basketball, and casino games at 7bet Uganda. Instant M-Pesa payments, great odds, and fun live betting.",
  //       requiresAuth: false,
  //     },
  //   },
  {
    path: "/bonus",
    name: "bonus",
    component: BonusPage,
    meta: {
      title: "My Bonuses | 7bet",
      description:
        "View and manage your bonuses, daily rewards, missions, and referral program at 7bet.",
      requiresAuth: false,
    },
  },
  {
    path: "/leagues",
    name: "leagues",
    component: LeaguesView,
    meta: {
      title: "Football Leagues & Fixtures | 7bet Sportsbook",
      description:
        "Browse upcoming football leagues and fixtures. Bet pre-match or live on your favorite teams at 7bet Uganda.",
      requiresAuth: false,
    },
  },
  {
    path: "/sports/live/:sport",
    name: "live",
    component: NewLive,
    meta: {
      title: "Live Betting – Real-Time Odds & Matches | 7bet",
      description:
        "Follow live games and place in-play bets with dynamic odds. Experience real-time sports betting excitement on 7bet.",
      requiresAuth: false,
    },
  },
  //   {
  //     path: "/new-live",
  //     name: "live-two",
  //     component: NewLive,
  //     meta: {
  //       title: "Live Betting – Real-Time Odds & Matches | 7bet",
  //       description:
  //         "Follow live games and place in-play bets with dynamic odds. Experience real-time sports betting excitement on 7bet.",
  //       requiresAuth: false,
  //     },
  //   },
  {
    path: "/sports/:sport",
    name: "sports",
    component: TheLanding,
    meta: {
      title: "Bet on :sport – Live Odds & Results | 7bet Uganda",
      description:
        "Bet live and pre-match on :sport events with top odds and instant payouts. 7bet delivers Uganda’s best sports betting experience.",
      requiresAuth: false,
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileIndex,
    meta: {
      title: "My Profile – Account, Bets & Settings | 7bet",
      description:
        "Manage your 7bet account, update details, track bets, and control preferences securely from your profile.",
      requiresAuth: true,
    },
  },
  {
    path: "/promotions",
    name: "promotions",
    component: ThePromotions,
    meta: {
      title: "7bet Promotions – Free Bets, Cashbacks & Bonuses",
      description:
        "Discover exciting 7bet offers including free bets, cashback, and deposit bonuses. Claim rewards every week.",
      requiresAuth: false,
    },
  },
  {
    path: "/promotion-details/:name",
    name: "promotion-details",
    component: PromotionDetails,
    meta: {
      title: "Promotion Details – Exclusive Offers | 7bet",
      description:
        "View full details of 7bet promotions and learn how to qualify for bonuses, free bets, and jackpots.",
      requiresAuth: false,
    },
  },
  {
    path: "/aviator",
    name: "aviator",
    component: TheAviator,
    meta: {
      title: "Play Aviator – Crash Game with Real Winnings | 7bet",
      description:
        "Soar high with the Aviator crash game! Cash out before the plane flies away and win real money instantly.",
      requiresAuth: false,
    },
  },
  {
    path: "/",
    component: TheAuth,
    children: [
      {
        path: "signup",
        name: "signup",
        component: TheSignup,
        meta: {
          title: "Register on 7bet – Create Account & Start Betting",
          description:
            "Sign up with 7bet and enjoy Uganda’s leading sports betting and casino experience. Quick, secure registration.",
          requiresAuth: false,
        },
      },
      {
        path: "login",
        name: "login",
        component: LoginView,
        meta: {
          title: "Login to 7bet | Access Your Account",
          description:
            "Log in to your 7bet account to continue betting, view your balance, and enjoy personalized promotions.",
          requiresAuth: false,
        },
      },
      {
        path: "forgot-password",
        name: "forgot-password",
        component: ForgotPassword,
        meta: {
          title: "Forgot Password | 7bet Account Recovery",
          description:
            "Reset your 7bet password easily and regain secure access to your betting account in minutes.",
          requiresAuth: false,
        },
      },
      {
        path: "reset-password",
        name: "reset-password",
        component: ResetPassword,
        meta: {
          title: "Reset Password | 7bet Secure Login",
          description:
            "Create a new password and restore your 7bet access quickly with our secure reset process.",
          requiresAuth: false,
        },
      },
      {
        path: "change-password",
        name: "change-password",
        component: ChangePassword,
        meta: {
          title: "Change Password | 7bet Security Settings",
          description:
            "Update your password for better account security. Protect your funds and data on 7bet Uganda.",
          requiresAuth: false,
        },
      },
      {
        path: "verify-account",
        name: "verify-account",
        component: VerifyAccount,
        meta: {
          title: "Verify Account | 7bet Uganda",
          description:
            "Complete your 7bet verification to enable withdrawals, bonuses, and secure transactions.",
          requiresAuth: false,
        },
      },
    ],
  },
  {
    path: "/sports/soccer/countries",
    name: "countries",
    component: LeaguesView,
    meta: {
      title: "All Sports Countries | 7bet",
      description:
        "Explore betting markets by country. Bet on leagues and matches across Uganda, Europe, and worldwide.",
      requiresAuth: false,
    },
  },
  {
    path: "/sports/:sport/:country/:league",
    name: "country",
    component: CountryView,
    meta: {
      title: ":country Sports Betting – Leagues & Fixtures | 7bet",
      description:
        "Bet on :country leagues and matches with top odds and live stats only on 7bet.",
      requiresAuth: false,
    },
  },
  {
    path: "/",
    component: WithSibarAndBetslip,
    children: [
      {
        path: "my-bets",
        name: "my-bets",
        component: TheBets,
        meta: {
          title: "My Bets | 7bet History & Results",
          description:
            "Track your bet history, view results, and manage open wagers securely on 7bet Uganda.",
          requiresAuth: true,
        },
      },
      {
        path: "bet-details",
        name: "bet-details",
        component: BetDetails,
        meta: {
          title: "Bet Details | 7bet Slip Info",
          description:
            "View full bet slip details, odds, and results instantly from your 7bet account.",
          requiresAuth: true,
        },
      },
      {
        path: "/sports/:sport/:country/:league/:matchSlug(.*)-:id",
        name: "match-details",
        component: MatchDetails,
        meta: {
          title: "Match Details – Live Stats & Betting Markets | 7bet",
          description:
            "Get in-depth stats, lineups, and odds for live matches. Bet instantly and follow your team on 7bet.",
          requiresAuth: false,
        },
      },
      //   {
      //     path: "/leaderboard",
      //     name: "leaderboard",
      //     component: LeaderBoard,
      //     meta: {
      //       title: "Leaderboard | Top Bettors & Rankings | 7bet",
      //       description:
      //         "See the top bettors and rankings on 7bet. Compete with other players and climb the leaderboard.",
      //       requiresAuth: true,
      //     },
      //   },
    ],
  },
  {
    path: "/join-affiliate",
    name: "join-affiliate",
    component: JoinAffiliate,
    meta: {
      title: "Affiliate Program | Earn with 7bet",
      description:
        "Join the 7bet Affiliate Program and earn commission promoting Uganda’s leading sports betting platform.",
      requiresAuth: true,
    },
  },
  {
    path: "/deposit",
    name: "deposit",
    component: DepositFunds,
    meta: {
      title: "Deposit Funds | Instant M-Pesa Payments | 7bet",
      description:
        "Deposit instantly via M-Pesa and start betting today. Secure, fast, and reliable deposits at 7bet.",
      requiresAuth: true,
    },
  },
  {
    path: "/sort-deposit",
    name: "sort-deposit",
    component: SortDeposit,
    meta: {
      title: "Sort Deposit | 7bet Payment Help",
      description:
        "Resolve deposit delays and confirm your transaction manually with our fast deposit sorting tool.",
      requiresAuth: false,
    },
  },
  {
    path: "/withdraw",
    name: "withdraw",
    component: WithdrawFunds,
    meta: {
      title: "Withdraw Winnings | Instant M-Pesa Cashouts | 7bet",
      description:
        "Withdraw your 7bet winnings instantly to M-Pesa. Quick, secure, and hassle-free payouts anytime.",
      requiresAuth: true,
    },
  },

  {
    path: "/casino-home",
    name: "casino-home",
    component: CasinoHome,
    meta: {
      title: "Casino | Play 500+ Games Online | 7bet",
      description:
        "Explore the best online casino games on 7bet. Slots, live casino, crash games, table games & more from top providers. Play now and win big!",
      requiresAuth: false,
    },
  },
  {
    path: "/",
    component: CrashIndex,
    children: [
      {
        path: "crash",
        name: "crash",
        component: CrashGames,
        meta: {
          title: "Crash Game | Multiply Your Winnings | 7bet",
          description:
            "Bet, watch the multiplier rise, and cash out before it crashes! The ultimate thrill game on 7bet.",
          requiresAuth: false,
        },
      },
      {
        path: "casino",
        name: "casino",
        component: AllGames,
        meta: {
          title: "Online Casino | Play Top Casino Games on 7bet",
          description:
            "Play the best online casino games on 7bet. Explore slots, live casino, and top-rated games with fast payouts and seamless gameplay.",
          requiresAuth: false,
        },
      },
    ],
  },

  {
    path: "/casino",
    component: CasinoLayout,
    children: [
      {
        path: "popular-games",
        name: "popular-games",
        component: TheCasino,
        meta: {
          title: "Popular Casino Games | Slots, Roulette & Aviator | 7bet",
          description:
            "Play trending casino games like Aviator, slots, and roulette. Win big instantly on 7bet Casino.",
          requiresAuth: false,
        },
      },
      {
        path: "new-games",
        name: "new-games",
        component: TheNewGames,
        meta: {
          title: "New Casino Games | Latest Releases on 7bet",
          description:
            "Try the newest online casino games on 7bet. Discover fun titles, exciting gameplay, and real winnings.",
          requiresAuth: false,
        },
      },
    ],
  },
  //   {
  //     path: "/popular",
  //     name: "casino",
  //     component: TheCasino,
  //     meta: {
  //       title: "Popular Casino Games | Slots, Roulette & Aviator | 7bet",
  //       description:
  //         "Play trending casino games like Aviator, slots, and roulette. Win big instantly on 7bet Casino.",
  //       requiresAuth: false,
  //     },
  //   },
  //   {
  //     path: "/new-games",
  //     name: "new-games",
  //     component: TheNewGames,
  //     meta: {
  //       title: "New Casino Games | Latest Releases on 7bet",
  //       description:
  //         "Try the newest online casino games on 7bet. Discover fun titles, exciting gameplay, and real winnings.",
  //       requiresAuth: false,
  //     },
  //   },
  {
    path: "/crash/:name",
    name: "play-crash-games",
    component: CasinoGame,
    meta: {
      title: `Play :name | 7bet Crash Game`,
      description:
        "Enjoy :name with smooth gameplay, fair odds, and real cash prizes at 7bet Uganda Crash Games.",
      requiresAuth: false,
    },
  },
  {
    path: "/virtual-games/:name",
    name: "play-virtuals-games",
    component: CasinoGame,
    meta: {
      title: "Play :name | 7bet Virtual Game",
      description:
        "Enjoy :name with smooth gameplay, fair odds, and real cash prizes at 7bet Uganda Virtual Games.",
      requiresAuth: false,
    },
  },
  {
    path: "/casino/:name",
    name: "play-casino-games",
    component: CasinoGame,
    meta: {
      title: "Play :name | 7bet Casino Game",
      description:
        "Enjoy :name with smooth gameplay, fair odds, and real cash prizes at 7bet Uganda Casino Games.",
      requiresAuth: false,
    },
  },
  // {
  //   path: "/share-happiness",
  //   name: "share-happiness",
  //   component: ShareZaKrisii,
  //   meta: {
  //     title: "Christmass Cheer: Holiday Bonus | 7bet Casino Games",
  //     description:
  //       "Claim your special Christmas Bonus! Join the Festive Cheer promotion for smooth gameplay, extra prizes, Mbuzi, and real cash giveaways at 7bet Uganda Casino Games this season.",
  //     requiresAuth: true,
  //   },
  // },

  {
    path: "/virtual-games",
    name: "virtuals",
    component: VirtualsIndex,
    meta: {
      title: "Virtual Sports | 24/7 Matches & Results | 7bet",
      description:
        "Bet on nonstop virtual football, racing, and more. Fast results and instant wins 24/7 on 7bet.",
      requiresAuth: false,
    },
  },
  {
    path: "/virtual-games/pari-league",
    name: "pari-league",
    component: KironLiteIndex,
    meta: {
      title: "Pari League | Virtual Football Betting | 7bet",
      description:
        "Play Pari League virtual football and enjoy realistic matches, live stats, and instant payouts.",
      requiresAuth: true,
    },
  },
  {
    path: "/virtual-games/pari-turbo",
    name: "pari-turbo",
    component: KironLiteIndex,
    meta: {
      title: "Pari Turbo | Fast Virtual Betting | 7bet",
      description:
        "Experience Pari Turbo – fast, exciting virtual betting rounds with quick results on 7bet Uganda.",
      requiresAuth: true,
    },
  },
  {
    path: "/virtual-games/pari-virtual-jackpot",
    name: "pari-virtual-jackpot",
    component: KironLiteIndex,
    meta: {
      title: "Pari Virtual Jackpot | Bet & Win Big | 7bet",
      description:
        "Join Pari Virtual Jackpot and stand a chance to win massive rewards. Fast results, endless fun!",
      requiresAuth: true,
    },
  },
  //   {
  //     path: "/instant",
  //     name: "instant",
  //     component: InstantIndex,
  //     meta: {
  //       title: "Instant Games | Quick Wins & Fun Play | 7bet",
  //       description:
  //         "Play instant win games and enjoy fast payouts. Quick entertainment and real rewards on 7bet.",
  //       requiresAuth: false,
  //     },
  //   },

  {
    path: "/terms-and-conditions",
    name: "terms-and-conditions",
    component: TermsAndConditions,
    meta: {
      title: "Terms & Conditions | 7bet Uganda",
      description:
        "Read 7bet’ terms and conditions to understand our rules, fair play policy, and legal requirements.",
      requiresAuth: false,
    },
  },
  {
    path: "/responsible-gambling",
    name: "responsible-gambling",
    component: ResponsibleGambling,
    meta: {
      title: "Responsible Gambling | Stay Safe with 7bet",
      description:
        "7bet promotes safe gaming. Access tools and support to gamble responsibly and stay in control.",
      requiresAuth: false,
    },
  },
  {
    path: "/privacy-policy",
    name: "privacy-policy",
    component: PrivacyPolicy,
    meta: {
      title: "Privacy Policy | Data Protection | 7bet",
      description:
        "Learn how 7bet protects your data under Uganda’s Data Protection Act and ensures secure transactions.",
      requiresAuth: false,
    },
  },
  //   {
  //     path: "/instant/live",
  //     name: "instant-live",
  //     component: InstantLive,
  //     meta: {
  //       title: "Instant Live Games | Real-Time Play | 7bet",
  //       description:
  //         "Play live instant games and compete for quick wins in real time. Exciting gameplay available 24/7.",
  //       requiresAuth: false,
  //     },
  //   },
  {
    path: "/share-bets/:code?",
    name: "share-bets",
    component: BookedBets,
    meta: {
      title: "Share Bets | Bet Slip Code | 7bet",
      description:
        "Share your 7bet bet slip using a unique code. Let friends view or play the same selections easily.",
      requiresAuth: false,
    },
  },
  {
    path: "/profile/exclude",
    name: "self-exclusion",
    component: SelfExclusion,
    meta: {
      title: "Self Exclusion | Take a Break from Betting | 7bet",
      description:
        "Pause your betting activity securely with 7bet’ self-exclusion tool. Play responsibly anytime.",
      requiresAuth: true,
    },
  },
  {
    path: "/virtual-league",
    name: "virtual-league",
    component: HakiLeague,
    meta: {
      title: "Virtual League | Bet on Simulated Matches | 7bet",
      description:
        "Enjoy nonstop virtual football leagues and tournaments with instant results and fast payouts.",
      requiresAuth: true,
    },
  },
  {
    path: "/virtual-games/playon",
    name: "playon",
    component: PlayonGame,
    meta: {
      title: "Playon | Virtual Football Betting | 7bet",
      description:
        "Play Playon virtual football and enjoy realistic matches, live stats, and instant payouts.",
      requiresAuth: true,
    },
  },
  //   {
  //     path: "/new-league",
  //     name: "laki-league",
  //     component: NewLeague,
  //     meta: {
  //       title: "Virtual League | Bet on Simulated Matches | 7bet",
  //       description:
  //         "Enjoy nonstop virtual football leagues and tournaments with instant results and fast payouts.",
  //       requiresAuth: true,
  //     },
  //   },
  {
    path: "/bet-placed",
    name: "bet-placed",
    component: BetPlacedSuccessfully,
    meta: {
      title: "Bet Placed successfully |  Bet Slip | 7bet",
      description:
        "Your bet has been placed successfully. Share your bet with friends and track your progress.",
      requiresAuth: true,
    },
  },
  {
    path: "/welcome-promotions",
    name: "welcome-promotions",
    component: WelcomePromotions,
    meta: {
      title: "Welcome Promotions | New Player Bonuses | 7bet",
      description:
        "New to 7bet? Claim your welcome bonuses and start betting with free cash and boosted odds.",
      requiresAuth: false,
    },
  },
  {
    path: "/share-feedback",
    name: "share-feedback",
    component: ShareAnIdea,
    meta: {
      title: "Share Feedback | Suggest Features | 7bet",
      description:
        "We value your input! Share ideas and feedback to help us improve your 7bet experience.",
      requiresAuth: false,
    },
  },
  //   {
  //     path: "/bonus",
  //     name: "bonus",
  //     component: BonusView,
  //     meta: {
  //       title: "Share Feedback | Suggest Features | 7bet",
  //       description:
  //         "We value your input! Share ideas and feedback to help us improve your 7bet experience.",
  //       requiresAuth: false,
  //     },
  //   },
  // welcome-gift route removed — freebet now claimed inline from hot section

  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFound,
    meta: {
      title: "Page Not Found | 7bet",
      description: "The page you are looking for does not exist.",
      robots: "noindex,nofollow",
      requiresAuth: false,
    },
  },
];

const sportMetaMap = {
  soccer: {
    title: "Football betting | Bet on football or soccer online – 7bet",
    description:
      "Bet on football matches from top leagues including EPL, La Liga, and Serie A. Get live odds and instant cashouts on 7bet.",
  },
  basketball: {
    title: "Basketball betting | Bet on NBA and more – 7bet",
    description:
      "Bet live on NBA, EuroLeague, and more with 7bet. Enjoy competitive odds, fast payouts, and secure betting.",
  },
  tennis: {
    title: "Tennis betting | Bet on tennis tournaments – 7bet",
    description:
      "Place bets on ATP, WTA, and Grand Slam matches. 7bet gives you instant payouts and live tennis betting options.",
  },
  cricket: {
    title: "Cricket betting | Bet on T20 and IPL matches – 7bet",
    description:
      "Bet on cricket tournaments including IPL, ODI, and T20 World Cup. 7bet gives you top odds and instant payouts.",
  },
  rugby: {
    title: "Rugby betting | Bet on rugby matches – 7bet",
    description:
      "Bet on rugby union and rugby league matches worldwide. Enjoy competitive odds, live betting, and fast payouts.",
  },
  iceHockey: {
    title: "Ice Hockey betting | Bet on NHL and more – 7bet",
    description:
      "Bet on NHL and global ice hockey leagues with live odds, real-time action, and instant cashouts.",
  },
  tableTennis: {
    title: "Table Tennis betting | Bet on live matches – 7bet",
    description:
      "Bet on ITTF and international table tennis events. Live odds, fast markets, and optimized betting experience.",
  },
  handball: {
    title: "Handball betting | Bet on top leagues – 7bet",
    description:
      "Explore handball betting markets from European and international leagues with competitive odds and fast payouts.",
  },
  volleyball: {
    title: "Volleyball betting | Bet on global leagues – 7bet",
    description:
      "Bet on volleyball leagues worldwide including international tournaments. Live betting and fast withdrawals.",
  },
  americanFootball: {
    title: "American Football betting | Bet on NFL and more – 7bet",
    description:
      "Bet on NFL, College Football, and more with live odds, prop bets, and fast payouts.",
  },
  boxing: {
    title: "Boxing betting | Bet on major fights – 7bet",
    description:
      "Bet on world boxing matches including title fights and major events. Live odds and instant payouts.",
  },
  eSoccer: {
    title: "eSoccer betting | Bet on virtual soccer – 7bet",
    description:
      "Bet on eSoccer and virtual football matches 24/7 with fast odds and instant results.",
  },
  aussieRules: {
    title: "Aussie Rules betting | Bet on AFL matches – 7bet",
    description:
      "Bet on AFL and Australian Rules Football with competitive odds and live betting options.",
  },
  futsal: {
    title: "Futsal betting | Bet on futsal leagues – 7bet",
    description:
      "Bet on international futsal leagues with real-time odds and fast payouts.",
  },
  golf: {
    title: "Golf betting | Bet on PGA and global tours – 7bet",
    description:
      "Bet on PGA Tour, LPGA, and global golf tournaments with top odds and live betting markets.",
  },
  hockey: {
    title: "Field Hockey betting | Bet on major matches – 7bet",
    description:
      "Bet on field hockey matches and international tournaments with competitive odds.",
  },
  horseRacing: {
    title: "Horse Racing betting | Bet on races worldwide – 7bet",
    description:
      "Bet on global horse racing events with instant payouts and live odds across all major tracks.",
  },
  snooker: {
    title: "Snooker betting | Bet on snooker tournaments – 7bet",
    description:
      "Bet on major snooker tournaments including World Snooker Championship and ranking events.",
  },
  motorSport: {
    title: "Motor Sport betting | Bet on F1 and racing events – 7bet",
    description:
      "Bet on Formula 1, MotoGP, NASCAR, and more with competitive odds and live race betting.",
  },
  badminton: {
    title: "Badminton betting | Bet on BWF tournaments – 7bet",
    description:
      "Bet on badminton matches including BWF tours and international tournaments with fast markets.",
  },
  baseball: {
    title: "Baseball betting | Bet on MLB and global leagues – 7bet",
    description:
      "Bet on MLB and international baseball leagues with live action and instant payouts.",
  },
  cycling: {
    title: "Cycling betting | Bet on major tours – 7bet",
    description:
      "Bet on cycling tours including Tour de France, Giro d’Italia, and Vuelta with real-time odds.",
  },
  darts: {
    title: "Darts betting | Bet on PDC events – 7bet",
    description:
      "Bet on major darts tournaments including PDC World Championship with competitive odds.",
  },
};

// Disable browser's built-in scroll restoration so we control it ourselves
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 1️⃣ When user navigates back/forward using browser buttons
    if (savedPosition) {
      return savedPosition;
    }

    // 2️⃣ When navigating to homepage, only scroll-restore from match-details; otherwise no scroll
    const homeRoutes = ["home", "sports"];
    if (homeRoutes.includes(to.name)) {
      if (from.name === "match-details") {
        return false; // let component handle scroll restore
      }
      return false; // no auto-scroll on homepage
    }

    // 3️⃣ Default: scroll to top for other pages
    return { top: 0 };
  },
});

let lastRoute = null;

router.beforeEach((to, from, next) => {
  lastRoute = from;

  const { getUtm, getBtag, getReferralCode } = useUtmStore();
  const { isAuthenticated } = storeToRefs(useLoginStore());
  const { setAfterLoginAction } = useLoginStore();

  getUtm(to);
  getBtag(to);
  getReferralCode(to);
  function goToRoute() {
    router.push({ name: to.name });
  }
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  //   if (requiresAuth && !isAuthenticated.value) next("/login");
  if (requiresAuth && !isAuthenticated.value) {
    setAfterLoginAction(goToRoute);
    const { openModal } = useModalStore();
    const { login } = useModalTypes();
    openModal(login);
  } else next();
});

router.afterEach((to) => {
  const defaultTitle = "7bet - Sports Betting & Casino Uganda";
  const defaultDesc =
    "Bet on football, live games, and casino with 7bet Uganda. Fast payouts, bonuses, and real-time odds.";
  const baseUrl = "https://7bet.com";

  const stripQuery = (p) => p.split("?")[0].replace(/\/{2,}/g, "/");
  const removeTrailingSlash = (p) =>
    p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
  const normalizePathForCanonical = (p) =>
    removeTrailingSlash(stripQuery(p)).toLowerCase();
  const absolute = (path) =>
    path.startsWith("http")
      ? path
      : `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;

  const isParamPage = () => {
    const q = to.fullPath.split("?")[1] || "";
    return /\butm_|^page=|[?&]sort=|[?&]session=/.test("?" + q);
  };

  // dynamic meta
  let title = to.meta.title || defaultTitle;
  let description = to.meta.description || defaultDesc;

  // Replace :sport param from sportMetaMap for sports/live routes
  if ((to.name === "sports" || to.name === "live") && to.params?.sport) {
    const sportKey = String(to.params.sport).toLowerCase();
    if (sportMetaMap[sportKey]) {
      title = sportMetaMap[sportKey].title;
      description = sportMetaMap[sportKey].description;
    }
  }

  // Replace dynamic route params (:name, :country) in meta title/description
  if (to.params) {
    const formatParam = (val) =>
      String(val)
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

    if (to.params.name) {
      const displayName = formatParam(to.params.name);
      title = title.replace(/:name/g, displayName);
      description = description.replace(/:name/g, displayName);
    }
    if (to.params.country) {
      const displayCountry = formatParam(to.params.country);
      title = title.replace(/:country/g, displayCountry);
      description = description.replace(/:country/g, displayCountry);
    }
    if (
      to.params.sport &&
      !sportMetaMap[String(to.params.sport).toLowerCase()]
    ) {
      const displaySport = formatParam(to.params.sport);
      title = title.replace(/:sport/g, displaySport);
      description = description.replace(/:sport/g, displaySport);
    }
  }

  const canonicalPath = normalizePathForCanonical(to.path || "/");
  const canonical = absolute(canonicalPath);
  const robots = isParamPage()
    ? "noindex,follow"
    : to.meta.robots || "index,follow";

  const ogImage =
    "https://imagedelivery.net/ZY5OwFLlTE2ePHl_IE20jg/c312dbf3-55e2-4169-f6e1-9ff7f87f7500/public";

  // JSON-LD schema
  const { combinedSchemas } = useOrganizationSchema();
  const schema = combinedSchemas(to, baseUrl);

  useHead({
    title,
    htmlAttrs: { lang: "en" },
    meta: [
      { name: "description", content: description },
      { name: "robots", content: robots },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonical },
      { property: "og:type", content: "website" },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:site_name", content: "7bet" },
      { property: "og:locale", content: "en_KE" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ],
    link: [{ rel: "canonical", href: canonical }],
    script: [
      {
        type: "application/ld+json",
        children: JSON.stringify(schema),
      },
    ],
  });
});

export function useLastRoute() {
  return lastRoute;
}

export default router;
