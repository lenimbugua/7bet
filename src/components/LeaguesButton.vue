<template>
  <RouterLink :to="{ name: 'countries' }" class="py-1 flex items-center">
    <div
      class="flex cursor-pointer p-1 px-1 rounded-md border dark:border-border-strong bg-white/5 text-enter focus:outline-hidden focus-visible:border-indigo-500"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="dark:text-white h-4 w-4 text-gray-900"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M5 22V3h16l-2 5l2 5H7v9zm2-11h11.05l-1.2-3l1.2-3H7zm0 0V5z"
        />
      </svg>
      <span
        class="ml-0.5 block truncate dark:text-white text-gray-900 capitalize text-xs"
        >Countries</span
      >
    </div>
  </RouterLink>
</template>
