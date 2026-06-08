import { useCompetionsStore } from "@/stores/competitions";
import { useSportsQueryParamsStore } from "@/stores/sports-query-params";
import { defineStore, storeToRefs } from "pinia";
import API from "../services/API";

export const useMatches2Store = defineStore("matches2-store", {
  state: () => ({
    pending: false,
    sportIsPending: false,
    calendarIsPending: false,
    responseOK: false,
    matches: [],
    markets: [],
    selectedMarket: null,
    full: false,
    page: 0,
    // Consecutive fetch errors — caps retries so a failing API can't be hammered
    errorCount: 0,

    //scrolling
    scrollTop: 0,
    restoreScroll: false,

    selectedSportId: null,
  }),

  getters: {
    getDefaultMarket: (state) => {
      if (state.selectedMarket) {
        console.log(state.selectedMarket);
        return state.selectedMarket;
      }
      if (!state.markets || !state.markets.length) {
        return;
      }
      return state.markets[0].subTypeId;
    },
  },

  actions: {
    async getMatches() {
      const { getParams, layout } = storeToRefs(useSportsQueryParamsStore());
      const { setPage } = useSportsQueryParamsStore();
      const { fetchCompetions } = useCompetionsStore();

      // Stop when everything is loaded, a request is in flight, or we've hit
      // too many consecutive errors — prevents the infinite-scroll loop from
      // hammering a failing API and exhausting server resources.
      if (this.full || this.pending) {
        return;
      }

      if (layout.value === "grid") {
        fetchCompetions();
        return;
      }

      setPage(this.page);

      try {
        this.pending = true;
        this.responseOK = false;
        const response = await API().get("/sportsbook/api/v2/matches", {
          params: getParams.value,
        });

        let matches = response.data.data.matches;

        if (!matches.length) {
          this.full = true;
          this.pending = false;
          this.responseOK = true;
          return;
        }

        this.markets = response.data.data.markets;

        this.matches.push(...matches);

        // Advance the page and clear the error counter only on success.
        this.page++;
        this.errorCount = 0;
        this.pending = false;
        this.responseOK = true;
      } catch (error) {
        this.pending = false;
        this.errorCount++;
        // After repeated failures, halt pagination so the scroll trigger stops
        // re-firing. Cleared when the list is reset (emptyMatches).
        if (this.errorCount >= 3) {
          this.full = true;
        }
      }
    },
    async emptyMatches() {
      this.matches = [];
      this.full = false;
      this.page = 0;
      this.errorCount = 0;
      // Fresh query: clear any in-flight flag so the new load isn't skipped
      this.pending = false;
    },
    setSelectedMarket(subTypeId) {
      this.selectedMarket = subTypeId;
    },
    resetSelectedMarket() {
      this.selectedMarket = null;
    },
    setMarkets(markets) {
      this.markets = markets;
    },
    setSportIsPending(payload) {
      this.sportIsPending = payload;
    },
    setCalendarIsPending(payload) {
      this.calendarIsPending = payload;
    },

    saveScrollPosition(scrollTop) {
      this.scrollTop = scrollTop;
      this.restoreScroll = true;
    },

    consumeScrollPosition() {
      this.restoreScroll = false;
      return this.scrollTop;
    },

    setSelectedSportId(id) {
      this.selectedSportId = id;
    },
  },
  persist: {
    pick: ["selectedMarket", "selectedSportId", "scrollTop", "restoreScroll"],
  },
});
