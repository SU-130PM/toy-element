<template>
  <div style="display: grid; gap: 12px;">
    <er-alert title="可关闭的 Alert" type="info" closable show-icon />
    <er-alert title="不可关闭的 Alert" type="warning" :closable="false" show-icon />
  </div>
</template>
