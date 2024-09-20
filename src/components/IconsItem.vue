<script>
import Vue from "vue";
import iconsData from "~/icons.json"; // 导入 JSON 数据
import IconSearch from "./icon/IconSearch.vue";
import IconArrowDown from "./icon/IconArrowDown.vue";
import VueClipboard from "vue-clipboard2";
import Message from "vue-m-message";
import "vue-m-message/dist/index.css";

Vue.use(VueClipboard);
Vue.use(Message);

export default {
  components: {
    IconSearch,
    IconArrowDown,
  },
  data() {
    return {
      showCopiedMessage: false,
      opacityValue: 0,
      isThrottled: false,
      iconNames: iconsData.map(icon => icon.componentName),
      sortBy: "date",
      showColorIcons: false,
      showAnimationIcons: false,
      searchQuery: "",
    };
  },
  computed: {
    filteredIconNames() {
      return this.iconNames.filter((iconName) =>
        iconName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    allButtonClass() {
      return this.getButtonClass(!this.showColorIcons);
    },
    colorButtonClass() {
      return this.getButtonClass(this.showColorIcons);
    },
  },
  methods: {
    async copyName(name) {
      try {
        await this.$copyText(name);
        Message.success("复制成功: " + name, { duration: 3000 });
      } catch (error) {
        console.error("复制失败:", error);
      }
    },
    sortIcons() {
      let sortedIcons = [...iconsData];
      if (this.sortBy === "date") {
        sortedIcons.sort(
          (a, b) => new Date(b.modifiedTime) - new Date(a.modifiedTime)
        );
      } else {
        sortedIcons.sort((a, b) => a.name.localeCompare(b.name));
      }
      if (this.showColorIcons) {
        sortedIcons = sortedIcons.filter((icon) => icon.componentName.includes("Color"));
      }
      if (this.showAnimationIcons) {
        sortedIcons = sortedIcons.filter((icon) =>
          icon.componentName.includes("Animation")
        );
      }
      this.iconNames = sortedIcons.map((icon) => icon.componentName);
    },
    handleSortChange(event) {
      this.sortBy = event.target.value;
      this.sortIcons();
    },
    filterColorIcons(show) {
      this.showColorIcons = show;
      this.sortIcons();
    },
    toggleAnimationIcons() {
      this.showAnimationIcons = !this.showAnimationIcons;
      this.sortIcons();
    },
    getButtonClass(isColor) {
      const commonButtonClass = [
        "inline-flex",
        "px-3",
        "py-1.5",
        "text-sm",
        "font-medium",
        "leading-6",
        "duration-200",
        "rounded-md",
        "transition-all",
      ];
      if (isColor) {
        return [...commonButtonClass, "text-slate-900", "bg-slate-100"];
      } else {
        return [
          ...commonButtonClass,
          "text-slate-500",
          "hover:text-slate-900",
          "hover:bg-slate-50",
        ];
      }
    },
  },
  mounted() {
    this.sortIcons();
  },
};
</script>

<template>
  <div>
    <div
      class="pointer-events-none sticky top-0 z-50 -mb-10 overflow-hidden pb-10 sm:-mb-11 sm:pb-11 md:-mb-12 md:pb-12"
    >
      <div class="relative">
        <svg
          viewBox="0 0 1140 34"
          fill="none"
          class="absolute bottom-[-16px] left-1/2 ml-[-570px] w-[1140px]"
        >
          <g opacity=".6" filter="url(#:R5l6:-a)">
            <path fill="url(#:R5l6:-b)" d="M6 6h1128v22H6z"></path>
            <path fill="url(#:R5l6:-c)" d="M6 6h1128v22H6z"></path>
          </g>
          <defs>
            <radialGradient
              id=":R5l6:-c"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="matrix(0 -22 1128 0 563 28)"
            >
              <stop
                offset=".273"
                stop-color="#fff"
                data-darkreader-inline-stopcolor=""
                style="--darkreader-inline-stopcolor: #111415"
              ></stop>
              <stop
                offset="1"
                stop-color="#fff"
                stop-opacity="0"
                data-darkreader-inline-stopcolor=""
                style="--darkreader-inline-stopcolor: #111415"
              ></stop>
            </radialGradient>
            <linearGradient
              id=":R5l6:-b"
              x1="6"
              y1="6"
              x2="1134"
              y2="6"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                stop-color="#A78BFA"
                stop-opacity="0"
                data-darkreader-inline-stopcolor=""
                style="--darkreader-inline-stopcolor: #20009d"
              ></stop>
              <stop
                offset=".323"
                stop-color="#A78BFA"
                data-darkreader-inline-stopcolor=""
                style="--darkreader-inline-stopcolor: #20009d"
              ></stop>
              <stop
                offset=".672"
                stop-color="#EC4899"
                stop-opacity=".3"
                data-darkreader-inline-stopcolor=""
                style="--darkreader-inline-stopcolor: #d6056c"
              ></stop>
              <stop
                offset="1"
                stop-color="#EC4899"
                stop-opacity="0"
                data-darkreader-inline-stopcolor=""
                style="--darkreader-inline-stopcolor: #d6056c"
              ></stop>
            </linearGradient>
            <filter
              id=":R5l6:-a"
              x="0"
              y="0"
              width="1140"
              height="34"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              ></feBlend>
              <feGaussianBlur
                stdDeviation="3"
                result="effect1_foregroundBlur_311_43535"
              ></feGaussianBlur>
            </filter>
          </defs>
        </svg>
        <div
          class="pointer-events-auto relative bg-white pb-4 shadow-[0_1px_3px_rgba(15,23,42,0.08)] sm:pb-0"
        >
          <div
            class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center"
          >
            <div class="relative flex-auto">
              <IconSearch
                class="pointer-events-none absolute flex justify-center items-center inset-y-0 left-0 h-full w-5 fill-slate-500 transition"
              />
              <input
                type="search"
                v-model="searchQuery"
                aria-label="搜索所有图标"
                placeholder="搜索所有图标…"
                class="block w-full appearance-none rounded-lg bg-transparent py-6 pl-9 pr-4 text-base text-slate-900 transition placeholder:text-slate-400 focus:outline-none sm:text-[0.8125rem] sm:leading-6 [&amp;::-webkit-search-cancel-button]:appearance-none [&amp;::-webkit-search-decoration]:appearance-none [&amp;::-webkit-search-results-button]:appearance-none [&amp;::-webkit-search-results-decoration]:appearance-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div
        aria-hidden="false"
        class="mt-9 hidden md:flex isolate items-baseline lg:gap-4"
        role="tablist"
        aria-orientation="horizontal"
      >
        <button :class="allButtonClass" @click="filterColorIcons(false)">
          全部
        </button>
        <button :class="colorButtonClass" @click="filterColorIcons(true)">
          彩色
        </button>
        <div
          class="ml-auto text-sm flex items-center gap-4"
          role="none"
          aria-hidden="true"
        >
          <label class="flex items-center gap-1 cursor-pointer select-none">
            <input
              class="size-4"
              type="checkbox"
              v-model="showAnimationIcons"
              @change="sortIcons"
            />
            动画图标
          </label>
          <div class="relative inline-block">
            <select
              class="appearance-none px-4 py-1 rounded-md border hover:bg-slate-50 border-slate-200 cursor-pointer focus-visible:outline-none pr-8"
              @change="handleSortChange"
            >
              <option value="date">最新</option>
              <option value="name">默认</option>
            </select>
            <IconArrowDown
              class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
            />
          </div>
        </div>
      </div>
      <ul class="wrapper">
        <li
          class="group item cursor-pointer"
          v-for="iconComponentName in filteredIconNames"
          :key="iconComponentName"
          :title="iconComponentName"
          @click="copyName(iconComponentName)"
        >
          <component :is="iconComponentName" />
          <div
            class="text-xs antialiased text-center truncate text-slate-500 text-wrap w-full h-4 group-hover:overflow-visible group-hover:break-words select-none"
          >
            {{ iconComponentName }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
  gap: 2rem;
  margin: 0;
  padding: 3rem 0;
}

.item {
  display: flex;
  gap: 0.75rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  padding: 1rem;
  border-radius: 0.5rem;
  /* position: relative; */
  aspect-ratio: 1 / 1;
  cursor: pointer;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  margin: 0;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.02), 0 1px 3px -1px rgba(0, 0, 0, 0.2);
}

.item:hover {
  box-shadow: 0 0.3px 0.4px rgba(0, 0, 0, 0.02),
    0 0.9px 1.5px rgba(0, 0, 0, 0.045), 0 3.5px 6px rgba(0, 0, 0, 0.09);
}
</style>
