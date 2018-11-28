<template>
    <div :class="['xz-menu']">
      <div
        :class="['shrink-node', leftPanelHide ? 'turn-right' : 'turn-left']"
        @click="showPanel">
        <span class="iconfont icon-shrink"></span>
      </div>
      <transition name="fade">
        <div v-show="!leftPanelHide" class="left-column-content">
          <div class="type-node">
            <div class="header-node">
              <span class="title-name">{{menuTitleName}}</span>
            </div>
            <div class="type-list">
              <div
                :class="['list-item circle-mark', {'active': activeItem === item.index}]"
                v-for="item in menuList"
                :key="item.index"
                @click="makeActive(item.index)"
              >
                <span class="type">{{item.name}}</span>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
export default {
  name: 'xz-menu',
  props: {
    menuTitleName: String,
    menuList: Array
  },
  data() {
    return {
      leftPanelHide: false,
      activeItem: 0
    }
  },
  methods: {
    // 展示或隐藏左侧面板
    showPanel() {
      this.leftPanelHide = !this.leftPanelHide
    },
    makeActive(item) {
      this.activeItem = item
    }
  }
}
</script>

<style scoped lang="scss">
$font-color: #595757;
.fade-enter-active, .fade-leave-active {
  transition: all ease 5s;
}
.fade-enter, .fade-leave-to {
  // transform: translateX(-300px);
  opacity: 0;
  width: 0;
}
.fade-enter-to, .fade-leave {
  opacity: 1;
  width: 300px;
}
.xz-menu {
  position: relative;
  // float: left;
  width: 300px;
  height: 100%;
  z-index: 100;
  // transition: all ease .4s;
  .shrink-node {
    display: inline-block;
    position: absolute;
    top: 50%;
    right: 0;
    color: #8fb1cb;
  }
  .turn-right {
    left: 0;
  }
  .turn-left {
    transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
  }
  .left-column-content {
    height: 100%;
    overflow: hidden;
    .type-node {
      height: 100%;
      padding: 10px;
      .header-node {
        line-height: 30px;
        font-size: 14px;
        font-weight: bold;
      }
      .type-list {
        height: calc(100% - 30px);
        margin: 0 -10px;
        overflow: auto;
        .list-item {
          position: relative;
          padding-left: 100px;
          line-height: 40px;
          font-size: 16px;
          text-align: left;
          color: $font-color;
        }
        .active,
        .list-item:hover {
          background: #e9f1f8;
          cursor: pointer;
        }
        .circle-mark::before {
          content: '';
          position: absolute;
          left: 50px;
          top: calc(50% - 4px);
          display: inline-block;
          width: 8px;
          height: 8px;
          background: $font-color;
          border-radius: 100%;
        }
      }
    }
  }
}
.hidden {
  width: 0;
}
</style>
