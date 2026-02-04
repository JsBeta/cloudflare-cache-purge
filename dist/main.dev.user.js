
// ==UserScript==
// @name           Cloudflare 缓存清除工具 Dev
// @namespace      https://github.com/JsBeta/cloudflare-cache-purge/
// @version        1.8.4
// @author         xuwei
// @description    一个好用的 Cloudflare 缓存清理工具，支持清除当前页面链接缓存、图片/CSS/JS 资源缓存，以及自定义多个 URL 的缓存清除。
// @icon           data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSIjZTc4OTMwIiBkPSJNODAwLjIxMzMzMyA0MzQuMzQ2NjY3YTI5OC42NjY2NjcgMjk4LjY2NjY2NyAwIDAgMC01NjEuOTItNDEuNkEyMTMuMzMzMzMzIDIxMy4zMzMzMzMgMCAwIDAgMjk4LjY2NjY2NyA4MTAuNjY2NjY3aDQ0OGExOTIgMTkyIDAgMCAwIDUzLjU0NjY2Ni0zNzYuMzJ6TTc0Ni42NjY2NjcgNzI1LjMzMzMzM0gyOTguNjY2NjY3YTEyOCAxMjggMCAwIDEgMC0yNTZoNC4yNjY2NjZBMjEzLjMzMzMzMyAyMTMuMzMzMzMzIDAgMCAxIDcyNS4zMzMzMzMgNTEyYTcuMjUzMzMzIDcuMjUzMzMzIDAgMCAxIDAgMi4xMzMzMzMgMTIwLjk2IDEyMC45NiAwIDAgMSAyMS4zMzMzMzQtMi4xMzMzMzMgMTA2LjY2NjY2NyAxMDYuNjY2NjY3IDAgMCAxIDAgMjEzLjMzMzMzM3ogbS0yMzQuNjY2NjY3LTQyLjY2NjY2NmExNDkuMzMzMzMzIDE0OS4zMzMzMzMgMCAxIDEgMTQ5LjMzMzMzMy0xNDkuMzMzMzM0aC04NS4zMzMzMzNhNjQgNjQgMCAxIDAtNjQgNjR6IiAvPjwvc3ZnPg==
// @include        *
// @license        MIT
// @connect        api.cloudflare.com
// @run-at         document-end
// @grant          GM_getValue
// @grant          GM_registerMenuCommand
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// ==/UserScript==
(function () {
  'use strict';

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = ".main_icon__RYCes {\n  display: inline-block;\n  vertical-align: middle;\n}\n.main_icon__RYCes path {\n  fill: #e78930;\n}\n.main_menu__MLtUQ {\n  position: fixed;\n  width: 40px;\n  right: 0;\n  top: 300px;\n  z-index: 100;\n  box-sizing: content-box;\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n}\n.main_menu__MLtUQ:hover ul {\n  right: 0px;\n}\n.main_menu__MLtUQ:hover .main_entry__oOnCr {\n  background: #0a4b85;\n  opacity: 1;\n}\n.main_menu__MLtUQ .main_entry__oOnCr {\n  padding: 3px;\n  cursor: pointer;\n  background: #fff;\n  border-radius: 25% 0 0 25%;\n  margin-bottom: 5px;\n  box-shadow: 2px 6px 10px 0px #0e121629;\n  opacity: 0.5;\n  transition: all 0.3s ease-in-out;\n}\n.main_menu__MLtUQ .main_entry__oOnCr .main_icon__RYCes path {\n  fill: #e78930;\n}\n.main_menu__MLtUQ .main_entry__oOnCr .main_icon__RYCes:hover {\n  rotate: 180deg;\n  transition: all 0.5s ease-in-out;\n}\n.main_menu__MLtUQ ul {\n  position: absolute;\n  transition: all 0.3s ease-in-out;\n  right: -40px;\n  margin: 0;\n  padding: 0;\n}\n.main_menu__MLtUQ li {\n  height: 34px;\n  margin-bottom: 2px;\n  list-style: none;\n  cursor: pointer;\n  position: relative;\n}\n.main_menu__MLtUQ li:hover .main_item__njE-F {\n  width: 85px;\n}\n.main_menu__MLtUQ li:hover .main_icon__RYCes path {\n  fill: #fff;\n}\n.main_menu__MLtUQ .main_item__njE-F {\n  box-sizing: content-box;\n  overflow: hidden;\n  white-space: nowrap;\n  width: 24px;\n  height: 24px;\n  line-height: 24px;\n  padding: 5px 5px 6px 5px;\n  position: absolute;\n  top: 0;\n  right: 0;\n  font-size: 12px;\n  color: #fff;\n  background: #0a4b85;\n  border-radius: 2px 0px 0px 2px;\n  transition: width 0.3s ease-in;\n}\n.main_menu__MLtUQ .main_item__njE-F:hover {\n  background: #e78930;\n}\n.main_menu__MLtUQ .main_item__njE-F .main_icon__RYCes {\n  margin-right: 5px;\n  transform: translateY(-1px);\n}\n.main_panel__t3SIt {\n  display: none;\n  border: 1px solid #ccc;\n  border-radius: 8px;\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);\n  background: #fff;\n  z-index: 9999;\n}\n.main_panel__t3SIt.main_show__HRMDu {\n  display: block;\n}\n.main_panel__t3SIt .main_close__2MGVA {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  cursor: pointer;\n  width: 20px;\n  height: 20px;\n}\n.main_panel__t3SIt .main_head__AwcOE {\n  height: 40px;\n  line-height: 40px;\n  padding: 0 20px;\n  border-bottom: 1px solid #ccc;\n  color: #000;\n  font-size: 16px;\n  font-weight: 600;\n}\n.main_panel__t3SIt .main_foot__-LFyQ {\n  height: 55px;\n  line-height: 40px;\n  padding: 5px 20px;\n  display: flex;\n  justify-content: flex-end;\n  gap: 20px;\n  align-items: center;\n  border-top: 1px solid #ccc;\n}\n.main_panel__t3SIt .main_foot__-LFyQ button {\n  cursor: pointer;\n  height: 35px;\n  line-height: 35px;\n  padding: 0px 30px;\n  background: #e78930;\n  color: #fff;\n  font-size: 14px;\n  border: none;\n  border-radius: 8px;\n}\n.main_panel__t3SIt .main_foot__-LFyQ button[data-id=\"panel-close\"] {\n  background: #ccc;\n  color: #333;\n}\n.main_panel__t3SIt .main_foot__-LFyQ button[data-id=\"panel-close\"]:hover {\n  color: #fff;\n}\n.main_panel__t3SIt .main_foot__-LFyQ button:hover {\n  background: #c46d1c;\n}\n.main_panel__t3SIt .main_wall__0tq2S {\n  position: relative;\n  width: 900px;\n  /* 4列 × (200px + gap) */\n  height: 700px;\n  overflow-y: auto;\n  z-index: 99;\n}\n.main_panel__t3SIt .main_wall__0tq2S .main_item__njE-F {\n  box-sizing: content-box;\n  position: relative;\n  display: inline-block;\n  padding: 10px;\n  vertical-align: top;\n  position: absolute;\n  transition: opacity 0.3s;\n}\n.main_panel__t3SIt .main_wall__0tq2S img {\n  cursor: pointer;\n  box-sizing: content-box;\n  width: 200px;\n  height: auto;\n  display: block;\n  background: #f1f1f1;\n  object-fit: scale-down;\n}\n.main_panel__t3SIt .main_wall__0tq2S input[type=\"checkbox\"] {\n  position: absolute;\n  top: 5px;\n  left: 5px;\n  z-index: 1;\n}\n.main_panel__t3SIt .main_wall__0tq2S input[type=\"checkbox\"] {\n  display: none;\n}\n.main_panel__t3SIt .main_wall__0tq2S input[type=\"checkbox\"]:checked + img {\n  box-shadow: 0 0 0 2px rgba(245, 148, 3, 0.76);\n}\n.main_panel__t3SIt .main_list__f6SQm {\n  padding: 20px;\n  position: relative;\n  width: 900px;\n  max-height: 600px;\n  overflow-y: auto;\n  z-index: 99;\n}\n.main_panel__t3SIt .main_list__f6SQm .main_item__njE-F {\n  cursor: pointer;\n  display: block;\n  padding: 0 5px;\n  margin-bottom: 8px;\n}\n.main_panel__t3SIt .main_list__f6SQm .main_item__njE-F span {\n  display: inline-block;\n  padding: 5px;\n  margin-left: 5px;\n  border-radius: 5px;\n}\n.main_panel__t3SIt .main_list__f6SQm input[type=\"checkbox\"]:checked + span {\n  box-shadow: 0 0 0 2px rgba(245, 148, 3, 0.76);\n}\n.main_panel__t3SIt .main_inputarea__mzOdr {\n  box-sizing: content-box;\n  padding: 20px;\n  position: relative;\n  width: 600px;\n  max-height: 600px;\n  overflow-y: auto;\n  z-index: 99;\n}\n.main_panel__t3SIt .main_inputarea__mzOdr textarea {\n  padding: 10px;\n  margin-top: 10px;\n  border: 1px solid #e78930;\n  line-height: 2;\n  border-radius: 5px;\n  max-width: 575px;\n  min-width: 575px;\n}\n.main_panel__t3SIt .main_inputarea__mzOdr textarea:focus {\n  outline: none;\n  border: 1px solid #fff;\n  box-shadow: 0 0 0 2px rgba(245, 148, 3, 0.76);\n}\n";
  var style = {"icon":"main_icon__RYCes","menu":"main_menu__MLtUQ","entry":"main_entry__oOnCr","item":"main_item__njE-F","panel":"main_panel__t3SIt","show":"main_show__HRMDu","close":"main_close__2MGVA","head":"main_head__AwcOE","foot":"main_foot__-LFyQ","wall":"main_wall__0tq2S","list":"main_list__f6SQm","inputarea":"main_inputarea__mzOdr"};
  styleInject(css_248z);

  // 配置信息
  let config = {
      apiToken: GM_getValue("cfApiToken", ""),
  };

  // 添加配置菜单
  GM_registerMenuCommand("配置 API Token", function () {
      const apiToken = prompt(
          "请输入您的 Cloudflare API Token:",
          config.apiToken
      );
      if (apiToken !== null) {
          GM_setValue("cfApiToken", apiToken);
          config.apiToken = apiToken;
      }
  });

  // 添加清除缓存菜单和页面按钮
  GM_registerMenuCommand("清除当前地址缓存", function () {
      clearCache([window.location.href]);
  });
  // 修改验证配置
  function validateConfig() {
      if (!config.apiToken) {
          alert("请先配置Cloudflare API Token.");
          return false;
      }
      return true;
  }

  // 查找zoneid
  async function getZoneId(domain) {
      return new Promise((resolve) => {
          console.debug("正在获取域名:", domain);
          GM_xmlhttpRequest({
              method: "GET",
              url: `https://api.cloudflare.com/client/v4/zones?name=${domain}`,
              headers: {
                  Authorization: `Bearer ${config.apiToken}`,
                  "Content-Type": "application/json",
              },
              onload: function (response) {
                  console.debug("API响应状态:", response.status);
                  const data = JSON.parse(response.responseText);
                  console.debug("完整API响应:", data);
                  if (data.result) {
                      resolve(data.result[0]?.id);
                  } else {
                      resolve(null);
                  }
              },
              onerror: function (error) {
                  console.error("获取Zone ID失败:", error);
                  resolve(null);
              },
          });
      });
  }

  // 清除缓存函数
  async function clearCache(urls) {
      console.debug("开始清除缓存流程");
      if (!urls.length) {
          alert("请选择或者输入需要清除的缓存项！");
          return;
      }
      if (!validateConfig()) return;
      let domain = new URL(window.location.href).hostname;
      // 去除domain的www前缀
      domain = domain.replace(/^www\./, "");
      console.debug("解析出的域名:", domain);
      const zoneId = await getZoneId(domain);
      if (!zoneId) {
          alert("未找到该域名对应的Cloudflare zone,请检查域名是否正确！");
          return;
      }
      // 使用动态zoneId发送请求...
      await purgeCache(zoneId, urls);
  }

  // 清除缓存封装
  function purgeCache(zongeId, urls) {
      const apiUrl = `https://api.cloudflare.com/client/v4/zones/${zongeId}/purge_cache`;
      console.debug(
          "%c [ 需要清除的urls ]: ",
          "color: #bf2c9f; background: pink; font-size: 13px;",
          urls
      );
      GM_xmlhttpRequest({
          method: "POST",
          url: apiUrl,
          headers: {
              Authorization: `Bearer ${config.apiToken}`,
              "Content-Type": "application/json",
          },
          data: JSON.stringify({
              files: [...urls],
          }),
          onload: function (response) {
              const result = JSON.parse(response.responseText);
              if (result.success) {
                  alert("缓存清理成功!");
                  // 刷新当前页面
                  window.location.reload();
              } else {
                  alert(
                      "API请求清理缓存失败(onload):" +
                          (result.errors?.[0]?.message || "Unknown error")
                  );
              }
          },
          onerror: function (error) {
              alert("API请求清理缓存失败(onerror): " + error.responseText);
          },
      });
  }

  // 获取当前链接请求响应头
  const getCfResponseHeaders = async (url) => {
      return new Promise((resolve) => {
          GM_xmlhttpRequest({
              method: "HEAD",
              url,
              onload: function (response) {
                  // 返回响应头中的cf-cache-status字段
                  const cfCacheStatusMatch = response.responseHeaders.match(
                      /cf-cache-status:\s*(.+)/i
                  );
                  const cfCacheStatusValue = cfCacheStatusMatch
                      ? cfCacheStatusMatch[1]
                      : null;
                  resolve(cfCacheStatusValue);
              },
              onerror: function (error) {
                  console.error("获取响应头失败:", error);
                  resolve(null);
              },
          });
      });
  };

  // 获取资源链接
  const getResources = () => {
      const blacklistedPatterns = [
          /analytics\.example\.com/,
          /www\.clarity/,
          /www\.google/,
          /app\.termly/,
      ];
      const jsLinks = Array.from(document.scripts)
          .map((s) => s.src)
          .filter(Boolean)
          .filter(
              (url) => !blacklistedPatterns.some((pattern) => pattern.test(url))
          );
      const cssLinks = Array.from(
          document.querySelectorAll('link[rel="stylesheet"]')
      ).map((link) => link.href);
      const imgLinks = Array.from(document.images)
          .map((img) => img.src)
          .filter(Boolean);
      const cssBgImages = new Set();
      Array.from(document.querySelectorAll("*")).forEach((el) => {
          const bg = getComputedStyle(el).backgroundImage;
          const m = bg.match(/url\(["']?(.*?)["']?\)/);
          if (m && m[1]) cssBgImages.add(m[1]);
      });

      const allImages = Array.from(new Set([...imgLinks, ...cssBgImages]));
      return {
          js: jsLinks,
          css: cssLinks,
          img: allImages,
      };
  };

  // 图片瀑布流布局
  const layoutMasonry = (containerSelector, columnCount = 4, spacing = 10) => {
      const container = document.querySelector(containerSelector);
      if (!container) return;

      const items = Array.from(container.querySelectorAll("label"));
      if (items.length === 0) return;

      requestAnimationFrame(() => {
          const itemWidth = 200 + spacing * 2; // 每个图片项的宽度（含左右 margin）
          let columnHeights = Array(columnCount).fill(0); // 存储每一列的高度

          items.forEach((item) => {
              // 找到当前最短的一列
              const minHeight = Math.min(...columnHeights);
              const colIndex = columnHeights.indexOf(minHeight);

              console.log(
                  "%c [ item.offsetHeight ]: ",
                  "color: #bf2c9f; background: pink; font-size: 13px;",
                  item.offsetHeight,
                  item.outHeight
              );

              // 设置绝对定位位置
              item.style.left = `${colIndex * itemWidth}px`;
              item.style.top = `${minHeight}px`;

              // 更新该列的高度
              const itemHeight = item.offsetHeight || 200;
              columnHeights[colIndex] += itemHeight;
          });
      });
  };

  // 创建资源列表面板;
  const createResourcePanel = (picArray, type) => {
      const container = document.createElement("div");
      container.classList.add(style.panel);
      container.innerHTML = `
        <div class="${style.head}">
            <span class="title">资源列表</span>
            <svg data-id="panel-close" class="${
                style.close
            }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <polygon
                    data-id="panel-close"
                    points="35.31 9.86 24 21.17 12.69 9.86 9.86 12.69 21.17 24 9.86 35.31 12.69 38.14 24 26.83 35.31 38.14 38.14 35.31 26.83 24 38.14 12.69 35.31 9.86" />
            </svg>
        </div>
        <div id="${type === "img" ? "x-panel-wall" : ""}" 
        class="${type === "img" ? style.wall : style.list}">
            ${picArray
                .map(
                    (url) =>
                        `
                        <label class="${style.item}">
                            <input type="checkbox" value="${url}"/>
                            ${
                                type === "img"
                                    ? `<img src="${url}" />`
                                    : `<span>${url}</span>`
                            }
                        </label>
                    `
                )
                .join("\n")}
        </div>
        <div class="${style.foot}">
            <button  data-id="panel-close">取消</button>
            <button data-id="panel-submit" data-type="${type}">清除</button>
        </div>
    
`;
      return container;
  };

  // 创建输入框面板;
  const createInputPanel = (type) => {
      const container = document.createElement("div");
      container.classList.add(style.panel);
      container.innerHTML = `
        <div class="${style.head}">
            <span class="title">清除多个url链接</span>
            <svg data-id="panel-close" class="${style.close}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <polygon
                    data-id="panel-close"
                    points="35.31 9.86 24 21.17 12.69 9.86 9.86 12.69 21.17 24 9.86 35.31 12.69 38.14 24 26.83 35.31 38.14 38.14 35.31 26.83 24 38.14 12.69 35.31 9.86" />
            </svg>
        </div>
        <div 
        class="${style.inputarea}">
            <textarea cols="80" rows="6" name="inputarea" placeholder="输入url链接,多个链接需要另取一行"></textarea>
        </div>
        <div class="${style.foot}">
            <button  data-id="panel-close">取消</button>
            <button data-id="panel-submit" data-type="${type}">清除</button>
        </div>
    
`;
      return container;
  };

  // 创建侧边菜单
  const createMenu = () => {
      const menuEle = document.createElement("div");
      menuEle.classList.add(style.menu);
      const entryEle = document.createElement("div"); // 入口按钮
      entryEle.classList.add(style.entry);
      entryEle.innerHTML = `
            <svg class="${style.icon}" width="36" height="36" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg">
                <path fill="#8D929C"
                    d="M896 512A384 384 0 0 0 533.333333 129.066667h-21.333333A384 384 0 0 0 129.066667 490.666667v21.333333A384 384 0 0 0 490.666667 896h21.333333a384 384 0 0 0 384-362.666667v-21.333333z m-85.333333 0v13.013333a128 128 0 0 1-249.813334 23.893334A213.333333 213.333333 0 0 0 721.066667 298.666667 298.666667 298.666667 0 0 1 810.666667 512zM512 213.333333h13.013333a128 128 0 0 1 23.893334 249.813334A213.333333 213.333333 0 0 0 298.666667 302.933333 298.666667 298.666667 0 0 1 512 213.333333zM213.333333 512v-13.013333a128 128 0 0 1 249.813334-23.893334A213.333333 213.333333 0 0 0 302.933333 725.333333 298.666667 298.666667 0 0 1 213.333333 512z m298.666667 298.666667h-13.013333a128 128 0 0 1-23.893334-249.813334A213.333333 213.333333 0 0 0 725.333333 721.066667 298.666667 298.666667 0 0 1 512 810.666667z" />
            </svg>`;
      const menuUlEle = document.createElement("ul"); // 入口菜单列表
      menuUlEle.innerHTML = `
            <li>
                <div class="${style.item}" data-id="imgs">
                    <svg class="${style.icon}" width="24" height="24" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill="#8D929C"
                            d="M853.333333 682.666667v-42.666667a42.666667 42.666667 0 0 0-85.333333 0v170.666667a42.666667 42.666667 0 0 0 85.333333 0h-42.666666v-85.333334h128v85.333334a128 128 0 0 1-256 0v-170.666667a128 128 0 0 1 256 0v42.666667z m-512-85.333334v-85.333333H85.333333v85.333333h85.333334v256H85.333333v85.333334h256v-85.333334h-85.333333V597.333333z m298.666667-85.333333v426.666667h-85.333333V654.293333l-42.666667 56.746667-42.666667-56.746667V938.666667h-85.333333V512h85.333333l42.666667 56.96L554.666667 512z m85.333333-426.666667l213.333334 213.333334v170.666666h-85.333334v-135.253333L689.92 170.666667H170.666667v298.666666H85.333333V85.333333z" />
                    </svg>
                    图片文件
                </div>
            </li>
            <li>
                <div class="${style.item}" data-id="css">
                    <svg class="${style.icon}" width="24" height="24" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill="#8D929C"
                            d="M725.333333 85.333333l213.333334 213.333334v170.666666h-85.333334v-135.253333L689.92 170.666667H170.666667v298.666666H85.333333V85.333333zM256 768v42.666667a42.666667 42.666667 0 0 1-85.333333 0v-170.666667a42.666667 42.666667 0 0 1 85.333333 0v42.666667h85.333333v-42.666667a128 128 0 0 0-256 0v170.666667a128 128 0 0 0 256 0v-42.666667z m256-85.333333a42.666667 42.666667 0 1 1 42.666667-42.666667h85.333333a128 128 0 1 0-128 128 42.666667 42.666667 0 1 1-42.666667 42.666667h-85.333333a128 128 0 1 0 128-128z m298.666667 0a42.666667 42.666667 0 1 1 42.666666-42.666667h85.333334a128 128 0 1 0-128 128 42.666667 42.666667 0 1 1-42.666667 42.666667h-85.333333a128 128 0 1 0 128-128z" />
                    </svg>
                    CSS文件
                </div>
            </li>
            <li>
                <div class="${style.item}" data-id="js">
                    <svg class="${style.icon}" width="24" height="24" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill="#8D929C"
                            d="M938.666667 298.666667v640H682.666667v-85.333334h170.666666V334.08L689.92 170.666667H170.666667v298.666666H85.333333V85.333333h640zM512 682.666667a42.666667 42.666667 0 1 1 42.666667-42.666667h85.333333a128 128 0 1 0-128 128 42.666667 42.666667 0 1 1-42.666667 42.666667h-85.333333a128 128 0 1 0 128-128z m-256-170.666667v298.666667a42.666667 42.666667 0 0 1-85.333333 0v-42.666667H85.333333v42.666667a128 128 0 0 0 256 0V512z" />
                    </svg>
                    JS文件
                </div>
            </li>
            <li>
                <div class="${style.item}" data-id="link">
                    <svg class="${style.icon}" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                        <path fill="#8D929C"
                            d="M18,44V30a6,6,0,0,1,12,0V44H26V30a2,2,0,0,0-4,0V44ZM16,28V24H4v4H8V40H4v4H16V40H12V28ZM34,4H4V22H8V8H32.34L40,15.66V22h4V14ZM32,24V44h4V24Zm12,0H40L36,34l4,10h4L40,34Z" />
                    </svg>
                    当前链接
                </div>
            </li>
            <li>
                <div class="${style.item}" data-id="urls">
                    <svg class="${style.icon}" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                        <path fill="#8D929C"
                            d="M44,40v4H32V24h4V40ZM40,15.66V22h4V14L34,4H4V22H8V8H32.34ZM28.08,34.39,30,44H26l-1.6-8L24,36H22v8H18V24h6a6,6,0,0,1,4.08,10.39ZM24,32a2,2,0,0,0,0-4H22v4ZM12,24V38a2,2,0,0,1-4,0V24H4V38a6,6,0,0,0,12,0V24Z" />
                    </svg>
                    多个链接
                </div>
            </li>

    `;

      menuEle.appendChild(entryEle);
      menuEle.appendChild(menuUlEle);
      return menuEle;
  };

  if (window.self === window.top) {
      window.addEventListener("load", function () {
          let xtoolsEle = null;
          getCfResponseHeaders(window.location.href).then((res) => {
              if (res) {
                  console.info(
                      `%c INFO %c 检测到当前网站经过 CloudFlare CDN 加速, 缓存清理小工具已经正常加载! %c`,
                      `background:#909399;border:1px solid #909399; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;`,
                      `border:1px solid #909399; padding: 1px; border-radius: 0 2px 2px 0; color: #909399;`,
                      "background:transparent"
                  );
                  xtoolsEle = document.createElement("div");
                  const menuEle = createMenu();
                  const resources = getResources();
                  const picPanelEle = createResourcePanel(resources.img, "img");
                  const cssPanelEle = createResourcePanel(resources.css, "css");
                  const jsPanelEle = createResourcePanel(resources.js, "js");
                  const inputPanelEle = createInputPanel("urls");

                  // 遍历childNodes，移除show样式
                  const closePanel = (nodes) => {
                      nodes.forEach((node) => {
                          node.classList.remove(style.show);
                      });
                  };

                  // 对菜单项的点击事件进行监听
                  xtoolsEle.addEventListener("click", function (e) {
                      e.stopPropagation();
                      switch (e.target.dataset.id) {
                          case "imgs":
                              // 选择图片
                              closePanel(this.childNodes);
                              picPanelEle.classList.add(style.show);
                              layoutMasonry("#x-panel-wall", 4);
                              break;
                          case "css":
                              // 选择css
                              closePanel(this.childNodes);
                              cssPanelEle.classList.add(style.show);
                              break;
                          case "js":
                              // 选择js
                              closePanel(this.childNodes);
                              jsPanelEle.classList.add(style.show);
                              break;
                          case "link":
                              // 清除当前link
                              clearCache([window.location.href]);
                              break;
                          case "urls":
                              closePanel(this.childNodes);
                              // 输入urls
                              inputPanelEle.classList.add(style.show);
                              break;

                          case "panel-submit":
                              {
                                  // 获取inputPanelEle中textarea的value 以回车分割成数组 // 如果textarea 为空 则返回空数组
                                  const inputUrls = inputPanelEle
                                      .querySelector("textarea")
                                      .value.split("\n")
                                      .filter(Boolean);

                                  const selected = [
                                      ...xtoolsEle.querySelectorAll(
                                          "input[type='checkbox']:checked"
                                      ),
                                  ].map((c) => c.value);

                                  clearCache([...inputUrls, ...selected]);
                              }
                              break;
                          case "panel-close":
                              // 遍历childNodes，移除show样式
                              closePanel(this.childNodes);
                              // 遍历所有的checkbox,取消选中
                              this.querySelectorAll(
                                  "input[type=checkbox]"
                              ).forEach((checkbox) => {
                                  checkbox.checked = false;
                              });
                              // 清空textarea的值
                              this.querySelector("textarea").value = "";
                              break;
                      }
                  });

                  xtoolsEle.appendChild(menuEle);
                  xtoolsEle.appendChild(picPanelEle);
                  xtoolsEle.appendChild(cssPanelEle);
                  xtoolsEle.appendChild(jsPanelEle);
                  xtoolsEle.appendChild(inputPanelEle);
                  document.body.appendChild(xtoolsEle);
              }
          });
      });
  }

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5kZXYudXNlci5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWluamVjdC9kaXN0L3N0eWxlLWluamVjdC5lcy5qcyIsIi4uL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHN0eWxlSW5qZWN0KGNzcywgcmVmKSB7XG4gIGlmICggcmVmID09PSB2b2lkIDAgKSByZWYgPSB7fTtcbiAgdmFyIGluc2VydEF0ID0gcmVmLmluc2VydEF0O1xuXG4gIGlmICghY3NzIHx8IHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuOyB9XG5cbiAgdmFyIGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gIHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gIHN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xuXG4gIGlmIChpbnNlcnRBdCA9PT0gJ3RvcCcpIHtcbiAgICBpZiAoaGVhZC5maXJzdENoaWxkKSB7XG4gICAgICBoZWFkLmluc2VydEJlZm9yZShzdHlsZSwgaGVhZC5maXJzdENoaWxkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICB9XG5cbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgc3R5bGVJbmplY3Q7XG4iLCJpbXBvcnQgc3R5bGUgZnJvbSBcIi4vc3R5bGVzL21haW4ubGVzc1wiO1xuXG4vLyDphY3nva7kv6Hmga9cbmxldCBjb25maWcgPSB7XG4gICAgYXBpVG9rZW46IEdNX2dldFZhbHVlKFwiY2ZBcGlUb2tlblwiLCBcIlwiKSxcbn07XG5cbi8vIOa3u+WKoOmFjee9ruiPnOWNlVxuR01fcmVnaXN0ZXJNZW51Q29tbWFuZChcIumFjee9riBBUEkgVG9rZW5cIiwgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGFwaVRva2VuID0gcHJvbXB0KFxuICAgICAgICBcIuivt+i+k+WFpeaCqOeahCBDbG91ZGZsYXJlIEFQSSBUb2tlbjpcIixcbiAgICAgICAgY29uZmlnLmFwaVRva2VuXG4gICAgKTtcbiAgICBpZiAoYXBpVG9rZW4gIT09IG51bGwpIHtcbiAgICAgICAgR01fc2V0VmFsdWUoXCJjZkFwaVRva2VuXCIsIGFwaVRva2VuKTtcbiAgICAgICAgY29uZmlnLmFwaVRva2VuID0gYXBpVG9rZW47XG4gICAgfVxufSk7XG5cbi8vIOa3u+WKoOa4hemZpOe8k+WtmOiPnOWNleWSjOmhtemdouaMiemSrlxuR01fcmVnaXN0ZXJNZW51Q29tbWFuZChcIua4hemZpOW9k+WJjeWcsOWdgOe8k+WtmFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgY2xlYXJDYWNoZShbd2luZG93LmxvY2F0aW9uLmhyZWZdKTtcbn0pO1xuLy8g5L+u5pS56aqM6K+B6YWN572uXG5mdW5jdGlvbiB2YWxpZGF0ZUNvbmZpZygpIHtcbiAgICBpZiAoIWNvbmZpZy5hcGlUb2tlbikge1xuICAgICAgICBhbGVydChcIuivt+WFiOmFjee9rkNsb3VkZmxhcmUgQVBJIFRva2VuLlwiKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuLy8g5p+l5om+em9uZWlkXG5hc3luYyBmdW5jdGlvbiBnZXRab25lSWQoZG9tYWluKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZGVidWcoXCLmraPlnKjojrflj5bln5/lkI06XCIsIGRvbWFpbik7XG4gICAgICAgIEdNX3htbGh0dHBSZXF1ZXN0KHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgICAgIHVybDogYGh0dHBzOi8vYXBpLmNsb3VkZmxhcmUuY29tL2NsaWVudC92NC96b25lcz9uYW1lPSR7ZG9tYWlufWAsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke2NvbmZpZy5hcGlUb2tlbn1gLFxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9ubG9hZDogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5kZWJ1ZyhcIkFQSeWTjeW6lOeKtuaAgTpcIiwgcmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShyZXNwb25zZS5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoXCLlrozmlbRBUEnlk43lupQ6XCIsIGRhdGEpO1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLnJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEucmVzdWx0WzBdPy5pZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25lcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuiOt+WPllpvbmUgSUTlpLHotKU6XCIsIGVycm9yKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbi8vIOa4hemZpOe8k+WtmOWHveaVsFxuYXN5bmMgZnVuY3Rpb24gY2xlYXJDYWNoZSh1cmxzKSB7XG4gICAgY29uc29sZS5kZWJ1ZyhcIuW8gOWni+a4hemZpOe8k+WtmOa1geeoi1wiKTtcbiAgICBpZiAoIXVybHMubGVuZ3RoKSB7XG4gICAgICAgIGFsZXJ0KFwi6K+36YCJ5oup5oiW6ICF6L6T5YWl6ZyA6KaB5riF6Zmk55qE57yT5a2Y6aG577yBXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghdmFsaWRhdGVDb25maWcoKSkgcmV0dXJuO1xuICAgIGxldCBkb21haW4gPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKS5ob3N0bmFtZTtcbiAgICAvLyDljrvpmaRkb21haW7nmoR3d3fliY3nvIBcbiAgICBkb21haW4gPSBkb21haW4ucmVwbGFjZSgvXnd3d1xcLi8sIFwiXCIpO1xuICAgIGNvbnNvbGUuZGVidWcoXCLop6PmnpDlh7rnmoTln5/lkI06XCIsIGRvbWFpbik7XG4gICAgY29uc3Qgem9uZUlkID0gYXdhaXQgZ2V0Wm9uZUlkKGRvbWFpbik7XG4gICAgaWYgKCF6b25lSWQpIHtcbiAgICAgICAgYWxlcnQoXCLmnKrmib7liLDor6Xln5/lkI3lr7nlupTnmoRDbG91ZGZsYXJlIHpvbmUs6K+35qOA5p+l5Z+f5ZCN5piv5ZCm5q2j56Gu77yBXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIOS9v+eUqOWKqOaAgXpvbmVJZOWPkemAgeivt+axgi4uLlxuICAgIGF3YWl0IHB1cmdlQ2FjaGUoem9uZUlkLCB1cmxzKTtcbn1cblxuLy8g5riF6Zmk57yT5a2Y5bCB6KOFXG5mdW5jdGlvbiBwdXJnZUNhY2hlKHpvbmdlSWQsIHVybHMpIHtcbiAgICBjb25zdCBhcGlVcmwgPSBgaHR0cHM6Ly9hcGkuY2xvdWRmbGFyZS5jb20vY2xpZW50L3Y0L3pvbmVzLyR7em9uZ2VJZH0vcHVyZ2VfY2FjaGVgO1xuICAgIGNvbnNvbGUuZGVidWcoXG4gICAgICAgIFwiJWMgWyDpnIDopoHmuIXpmaTnmoR1cmxzIF06IFwiLFxuICAgICAgICBcImNvbG9yOiAjYmYyYzlmOyBiYWNrZ3JvdW5kOiBwaW5rOyBmb250LXNpemU6IDEzcHg7XCIsXG4gICAgICAgIHVybHNcbiAgICApO1xuICAgIEdNX3htbGh0dHBSZXF1ZXN0KHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgdXJsOiBhcGlVcmwsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHtjb25maWcuYXBpVG9rZW59YCxcbiAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICB9LFxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBmaWxlczogWy4uLnVybHNdLFxuICAgICAgICB9KSxcbiAgICAgICAgb25sb2FkOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IEpTT04ucGFyc2UocmVzcG9uc2UucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwi57yT5a2Y5riF55CG5oiQ5YqfIVwiKTtcbiAgICAgICAgICAgICAgICAvLyDliLfmlrDlvZPliY3pobXpnaJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFsZXJ0KFxuICAgICAgICAgICAgICAgICAgICBcIkFQSeivt+axgua4heeQhue8k+WtmOWksei0pShvbmxvYWQpOlwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIChyZXN1bHQuZXJyb3JzPy5bMF0/Lm1lc3NhZ2UgfHwgXCJVbmtub3duIGVycm9yXCIpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb25lcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBhbGVydChcIkFQSeivt+axgua4heeQhue8k+WtmOWksei0pShvbmVycm9yKTogXCIgKyBlcnJvci5yZXNwb25zZVRleHQpO1xuICAgICAgICB9LFxuICAgIH0pO1xufVxuXG4vLyDojrflj5blvZPliY3pk77mjqXor7fmsYLlk43lupTlpLRcbmNvbnN0IGdldENmUmVzcG9uc2VIZWFkZXJzID0gYXN5bmMgKHVybCkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICBHTV94bWxodHRwUmVxdWVzdCh7XG4gICAgICAgICAgICBtZXRob2Q6IFwiSEVBRFwiLFxuICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgb25sb2FkOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAvLyDov5Tlm57lk43lupTlpLTkuK3nmoRjZi1jYWNoZS1zdGF0dXPlrZfmrrVcbiAgICAgICAgICAgICAgICBjb25zdCBjZkNhY2hlU3RhdHVzTWF0Y2ggPSByZXNwb25zZS5yZXNwb25zZUhlYWRlcnMubWF0Y2goXG4gICAgICAgICAgICAgICAgICAgIC9jZi1jYWNoZS1zdGF0dXM6XFxzKiguKykvaVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY29uc3QgY2ZDYWNoZVN0YXR1c1ZhbHVlID0gY2ZDYWNoZVN0YXR1c01hdGNoXG4gICAgICAgICAgICAgICAgICAgID8gY2ZDYWNoZVN0YXR1c01hdGNoWzFdXG4gICAgICAgICAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGNmQ2FjaGVTdGF0dXNWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25lcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuiOt+WPluWTjeW6lOWktOWksei0pTpcIiwgZXJyb3IpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5cbi8vIOiOt+WPlui1hOa6kOmTvuaOpVxuY29uc3QgZ2V0UmVzb3VyY2VzID0gKCkgPT4ge1xuICAgIGNvbnN0IGJsYWNrbGlzdGVkUGF0dGVybnMgPSBbXG4gICAgICAgIC9hbmFseXRpY3NcXC5leGFtcGxlXFwuY29tLyxcbiAgICAgICAgL3d3d1xcLmNsYXJpdHkvLFxuICAgICAgICAvd3d3XFwuZ29vZ2xlLyxcbiAgICAgICAgL2FwcFxcLnRlcm1seS8sXG4gICAgXTtcbiAgICBjb25zdCBqc0xpbmtzID0gQXJyYXkuZnJvbShkb2N1bWVudC5zY3JpcHRzKVxuICAgICAgICAubWFwKChzKSA9PiBzLnNyYylcbiAgICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgICAuZmlsdGVyKFxuICAgICAgICAgICAgKHVybCkgPT4gIWJsYWNrbGlzdGVkUGF0dGVybnMuc29tZSgocGF0dGVybikgPT4gcGF0dGVybi50ZXN0KHVybCkpXG4gICAgICAgICk7XG4gICAgY29uc3QgY3NzTGlua3MgPSBBcnJheS5mcm9tKFxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaW5rW3JlbD1cInN0eWxlc2hlZXRcIl0nKVxuICAgICkubWFwKChsaW5rKSA9PiBsaW5rLmhyZWYpO1xuICAgIGNvbnN0IGltZ0xpbmtzID0gQXJyYXkuZnJvbShkb2N1bWVudC5pbWFnZXMpXG4gICAgICAgIC5tYXAoKGltZykgPT4gaW1nLnNyYylcbiAgICAgICAgLmZpbHRlcihCb29sZWFuKTtcbiAgICBjb25zdCBjc3NCZ0ltYWdlcyA9IG5ldyBTZXQoKTtcbiAgICBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIqXCIpKS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICBjb25zdCBiZyA9IGdldENvbXB1dGVkU3R5bGUoZWwpLmJhY2tncm91bmRJbWFnZTtcbiAgICAgICAgY29uc3QgbSA9IGJnLm1hdGNoKC91cmxcXChbXCInXT8oLio/KVtcIiddP1xcKS8pO1xuICAgICAgICBpZiAobSAmJiBtWzFdKSBjc3NCZ0ltYWdlcy5hZGQobVsxXSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBhbGxJbWFnZXMgPSBBcnJheS5mcm9tKG5ldyBTZXQoWy4uLmltZ0xpbmtzLCAuLi5jc3NCZ0ltYWdlc10pKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBqczoganNMaW5rcyxcbiAgICAgICAgY3NzOiBjc3NMaW5rcyxcbiAgICAgICAgaW1nOiBhbGxJbWFnZXMsXG4gICAgfTtcbn07XG5cbi8vIOWbvueJh+eAkeW4g+a1geW4g+WxgFxuY29uc3QgbGF5b3V0TWFzb25yeSA9IChjb250YWluZXJTZWxlY3RvciwgY29sdW1uQ291bnQgPSA0LCBzcGFjaW5nID0gMTApID0+IHtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lclNlbGVjdG9yKTtcbiAgICBpZiAoIWNvbnRhaW5lcikgcmV0dXJuO1xuXG4gICAgY29uc3QgaXRlbXMgPSBBcnJheS5mcm9tKGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwibGFiZWxcIikpO1xuICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGl0ZW1XaWR0aCA9IDIwMCArIHNwYWNpbmcgKiAyOyAvLyDmr4/kuKrlm77niYfpobnnmoTlrr3luqbvvIjlkKvlt6blj7MgbWFyZ2lu77yJXG4gICAgICAgIGxldCBjb2x1bW5IZWlnaHRzID0gQXJyYXkoY29sdW1uQ291bnQpLmZpbGwoMCk7IC8vIOWtmOWCqOavj+S4gOWIl+eahOmrmOW6plxuXG4gICAgICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIC8vIOaJvuWIsOW9k+WJjeacgOefreeahOS4gOWIl1xuICAgICAgICAgICAgY29uc3QgbWluSGVpZ2h0ID0gTWF0aC5taW4oLi4uY29sdW1uSGVpZ2h0cyk7XG4gICAgICAgICAgICBjb25zdCBjb2xJbmRleCA9IGNvbHVtbkhlaWdodHMuaW5kZXhPZihtaW5IZWlnaHQpO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICBcIiVjIFsgaXRlbS5vZmZzZXRIZWlnaHQgXTogXCIsXG4gICAgICAgICAgICAgICAgXCJjb2xvcjogI2JmMmM5ZjsgYmFja2dyb3VuZDogcGluazsgZm9udC1zaXplOiAxM3B4O1wiLFxuICAgICAgICAgICAgICAgIGl0ZW0ub2Zmc2V0SGVpZ2h0LFxuICAgICAgICAgICAgICAgIGl0ZW0ub3V0SGVpZ2h0XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLyDorr7nva7nu53lr7nlrprkvY3kvY3nva5cbiAgICAgICAgICAgIGl0ZW0uc3R5bGUubGVmdCA9IGAke2NvbEluZGV4ICogaXRlbVdpZHRofXB4YDtcbiAgICAgICAgICAgIGl0ZW0uc3R5bGUudG9wID0gYCR7bWluSGVpZ2h0fXB4YDtcblxuICAgICAgICAgICAgLy8g5pu05paw6K+l5YiX55qE6auY5bqmXG4gICAgICAgICAgICBjb25zdCBpdGVtSGVpZ2h0ID0gaXRlbS5vZmZzZXRIZWlnaHQgfHwgMjAwO1xuICAgICAgICAgICAgY29sdW1uSGVpZ2h0c1tjb2xJbmRleF0gKz0gaXRlbUhlaWdodDtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG4vLyDliJvlu7rotYTmupDliJfooajpnaLmnb87XG5jb25zdCBjcmVhdGVSZXNvdXJjZVBhbmVsID0gKHBpY0FycmF5LCB0eXBlKSA9PiB7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChzdHlsZS5wYW5lbCk7XG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cIiR7c3R5bGUuaGVhZH1cIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGl0bGVcIj7otYTmupDliJfooag8L3NwYW4+XG4gICAgICAgICAgICA8c3ZnIGRhdGEtaWQ9XCJwYW5lbC1jbG9zZVwiIGNsYXNzPVwiJHtcbiAgICAgICAgICAgICAgICBzdHlsZS5jbG9zZVxuICAgICAgICAgICAgfVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDQ4IDQ4XCI+XG4gICAgICAgICAgICAgICAgPHBvbHlnb25cbiAgICAgICAgICAgICAgICAgICAgZGF0YS1pZD1cInBhbmVsLWNsb3NlXCJcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRzPVwiMzUuMzEgOS44NiAyNCAyMS4xNyAxMi42OSA5Ljg2IDkuODYgMTIuNjkgMjEuMTcgMjQgOS44NiAzNS4zMSAxMi42OSAzOC4xNCAyNCAyNi44MyAzNS4zMSAzOC4xNCAzOC4xNCAzNS4zMSAyNi44MyAyNCAzOC4xNCAxMi42OSAzNS4zMSA5Ljg2XCIgLz5cbiAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBpZD1cIiR7dHlwZSA9PT0gXCJpbWdcIiA/IFwieC1wYW5lbC13YWxsXCIgOiBcIlwifVwiIFxuICAgICAgICBjbGFzcz1cIiR7dHlwZSA9PT0gXCJpbWdcIiA/IHN0eWxlLndhbGwgOiBzdHlsZS5saXN0fVwiPlxuICAgICAgICAgICAgJHtwaWNBcnJheVxuICAgICAgICAgICAgICAgIC5tYXAoXG4gICAgICAgICAgICAgICAgICAgICh1cmwpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICBgXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCIke3N0eWxlLml0ZW19XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIHZhbHVlPVwiJHt1cmx9XCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPT09IFwiaW1nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gYDxpbWcgc3JjPVwiJHt1cmx9XCIgLz5gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGA8c3Bhbj4ke3VybH08L3NwYW4+YFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLmpvaW4oXCJcXG5cIil9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiJHtzdHlsZS5mb290fVwiPlxuICAgICAgICAgICAgPGJ1dHRvbiAgZGF0YS1pZD1cInBhbmVsLWNsb3NlXCI+5Y+W5raIPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGRhdGEtaWQ9XCJwYW5lbC1zdWJtaXRcIiBkYXRhLXR5cGU9XCIke3R5cGV9XCI+5riF6ZmkPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgIFxuYDtcbiAgICByZXR1cm4gY29udGFpbmVyO1xufTtcblxuLy8g5Yib5bu66L6T5YWl5qGG6Z2i5p2/O1xuY29uc3QgY3JlYXRlSW5wdXRQYW5lbCA9ICh0eXBlKSA9PiB7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChzdHlsZS5wYW5lbCk7XG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cIiR7c3R5bGUuaGVhZH1cIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGl0bGVcIj7muIXpmaTlpJrkuKp1cmzpk77mjqU8L3NwYW4+XG4gICAgICAgICAgICA8c3ZnIGRhdGEtaWQ9XCJwYW5lbC1jbG9zZVwiIGNsYXNzPVwiJHtzdHlsZS5jbG9zZX1cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA0OCA0OFwiPlxuICAgICAgICAgICAgICAgIDxwb2x5Z29uXG4gICAgICAgICAgICAgICAgICAgIGRhdGEtaWQ9XCJwYW5lbC1jbG9zZVwiXG4gICAgICAgICAgICAgICAgICAgIHBvaW50cz1cIjM1LjMxIDkuODYgMjQgMjEuMTcgMTIuNjkgOS44NiA5Ljg2IDEyLjY5IDIxLjE3IDI0IDkuODYgMzUuMzEgMTIuNjkgMzguMTQgMjQgMjYuODMgMzUuMzEgMzguMTQgMzguMTQgMzUuMzEgMjYuODMgMjQgMzguMTQgMTIuNjkgMzUuMzEgOS44NlwiIC8+XG4gICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgXG4gICAgICAgIGNsYXNzPVwiJHtzdHlsZS5pbnB1dGFyZWF9XCI+XG4gICAgICAgICAgICA8dGV4dGFyZWEgY29scz1cIjgwXCIgcm93cz1cIjZcIiBuYW1lPVwiaW5wdXRhcmVhXCIgcGxhY2Vob2xkZXI9XCLovpPlhaV1cmzpk77mjqUs5aSa5Liq6ZO+5o6l6ZyA6KaB5Y+m5Y+W5LiA6KGMXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCIke3N0eWxlLmZvb3R9XCI+XG4gICAgICAgICAgICA8YnV0dG9uICBkYXRhLWlkPVwicGFuZWwtY2xvc2VcIj7lj5bmtog8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gZGF0YS1pZD1cInBhbmVsLXN1Ym1pdFwiIGRhdGEtdHlwZT1cIiR7dHlwZX1cIj7muIXpmaQ8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgXG5gO1xuICAgIHJldHVybiBjb250YWluZXI7XG59O1xuXG4vLyDliJvlu7rkvqfovrnoj5zljZVcbmNvbnN0IGNyZWF0ZU1lbnUgPSAoKSA9PiB7XG4gICAgY29uc3QgbWVudUVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgbWVudUVsZS5jbGFzc0xpc3QuYWRkKHN0eWxlLm1lbnUpO1xuICAgIGNvbnN0IGVudHJ5RWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTsgLy8g5YWl5Y+j5oyJ6ZKuXG4gICAgZW50cnlFbGUuY2xhc3NMaXN0LmFkZChzdHlsZS5lbnRyeSk7XG4gICAgZW50cnlFbGUuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPHN2ZyBjbGFzcz1cIiR7c3R5bGUuaWNvbn1cIiB3aWR0aD1cIjM2XCIgaGVpZ2h0PVwiMzZcIiB2aWV3Qm94PVwiMCAwIDEwMjQgMTAyNFwiIHZlcnNpb249XCIxLjFcIlxuICAgICAgICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPVwiIzhEOTI5Q1wiXG4gICAgICAgICAgICAgICAgICAgIGQ9XCJNODk2IDUxMkEzODQgMzg0IDAgMCAwIDUzMy4zMzMzMzMgMTI5LjA2NjY2N2gtMjEuMzMzMzMzQTM4NCAzODQgMCAwIDAgMTI5LjA2NjY2NyA0OTAuNjY2NjY3djIxLjMzMzMzM0EzODQgMzg0IDAgMCAwIDQ5MC42NjY2NjcgODk2aDIxLjMzMzMzM2EzODQgMzg0IDAgMCAwIDM4NC0zNjIuNjY2NjY3di0yMS4zMzMzMzN6IG0tODUuMzMzMzMzIDB2MTMuMDEzMzMzYTEyOCAxMjggMCAwIDEtMjQ5LjgxMzMzNCAyMy44OTMzMzRBMjEzLjMzMzMzMyAyMTMuMzMzMzMzIDAgMCAwIDcyMS4wNjY2NjcgMjk4LjY2NjY2NyAyOTguNjY2NjY3IDI5OC42NjY2NjcgMCAwIDEgODEwLjY2NjY2NyA1MTJ6TTUxMiAyMTMuMzMzMzMzaDEzLjAxMzMzM2ExMjggMTI4IDAgMCAxIDIzLjg5MzMzNCAyNDkuODEzMzM0QTIxMy4zMzMzMzMgMjEzLjMzMzMzMyAwIDAgMCAyOTguNjY2NjY3IDMwMi45MzMzMzMgMjk4LjY2NjY2NyAyOTguNjY2NjY3IDAgMCAxIDUxMiAyMTMuMzMzMzMzek0yMTMuMzMzMzMzIDUxMnYtMTMuMDEzMzMzYTEyOCAxMjggMCAwIDEgMjQ5LjgxMzMzNC0yMy44OTMzMzRBMjEzLjMzMzMzMyAyMTMuMzMzMzMzIDAgMCAwIDMwMi45MzMzMzMgNzI1LjMzMzMzMyAyOTguNjY2NjY3IDI5OC42NjY2NjcgMCAwIDEgMjEzLjMzMzMzMyA1MTJ6IG0yOTguNjY2NjY3IDI5OC42NjY2NjdoLTEzLjAxMzMzM2ExMjggMTI4IDAgMCAxLTIzLjg5MzMzNC0yNDkuODEzMzM0QTIxMy4zMzMzMzMgMjEzLjMzMzMzMyAwIDAgMCA3MjUuMzMzMzMzIDcyMS4wNjY2NjcgMjk4LjY2NjY2NyAyOTguNjY2NjY3IDAgMCAxIDUxMiA4MTAuNjY2NjY3elwiIC8+XG4gICAgICAgICAgICA8L3N2Zz5gO1xuICAgIGNvbnN0IG1lbnVVbEVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTsgLy8g5YWl5Y+j6I+c5Y2V5YiX6KGoXG4gICAgbWVudVVsRWxlLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHtzdHlsZS5pdGVtfVwiIGRhdGEtaWQ9XCJpbWdzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3M9XCIke3N0eWxlLmljb259XCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAxMDI0IDEwMjRcIiB2ZXJzaW9uPVwiMS4xXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCIjOEQ5MjlDXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkPVwiTTg1My4zMzMzMzMgNjgyLjY2NjY2N3YtNDIuNjY2NjY3YTQyLjY2NjY2NyA0Mi42NjY2NjcgMCAwIDAtODUuMzMzMzMzIDB2MTcwLjY2NjY2N2E0Mi42NjY2NjcgNDIuNjY2NjY3IDAgMCAwIDg1LjMzMzMzMyAwaC00Mi42NjY2NjZ2LTg1LjMzMzMzNGgxMjh2ODUuMzMzMzM0YTEyOCAxMjggMCAwIDEtMjU2IDB2LTE3MC42NjY2NjdhMTI4IDEyOCAwIDAgMSAyNTYgMHY0Mi42NjY2Njd6IG0tNTEyLTg1LjMzMzMzNHYtODUuMzMzMzMzSDg1LjMzMzMzM3Y4NS4zMzMzMzNoODUuMzMzMzM0djI1Nkg4NS4zMzMzMzN2ODUuMzMzMzM0aDI1NnYtODUuMzMzMzM0aC04NS4zMzMzMzNWNTk3LjMzMzMzM3ogbTI5OC42NjY2NjctODUuMzMzMzMzdjQyNi42NjY2NjdoLTg1LjMzMzMzM1Y2NTQuMjkzMzMzbC00Mi42NjY2NjcgNTYuNzQ2NjY3LTQyLjY2NjY2Ny01Ni43NDY2NjdWOTM4LjY2NjY2N2gtODUuMzMzMzMzVjUxMmg4NS4zMzMzMzNsNDIuNjY2NjY3IDU2Ljk2TDU1NC42NjY2NjcgNTEyeiBtODUuMzMzMzMzLTQyNi42NjY2NjdsMjEzLjMzMzMzNCAyMTMuMzMzMzM0djE3MC42NjY2NjZoLTg1LjMzMzMzNHYtMTM1LjI1MzMzM0w2ODkuOTIgMTcwLjY2NjY2N0gxNzAuNjY2NjY3djI5OC42NjY2NjZIODUuMzMzMzMzVjg1LjMzMzMzM3pcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICAgICAg5Zu+54mH5paH5Lu2XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCIke3N0eWxlLml0ZW19XCIgZGF0YS1pZD1cImNzc1wiPlxuICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzPVwiJHtzdHlsZS5pY29ufVwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMTAyNCAxMDI0XCIgdmVyc2lvbj1cIjEuMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPVwiIzhEOTI5Q1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZD1cIk03MjUuMzMzMzMzIDg1LjMzMzMzM2wyMTMuMzMzMzM0IDIxMy4zMzMzMzR2MTcwLjY2NjY2NmgtODUuMzMzMzM0di0xMzUuMjUzMzMzTDY4OS45MiAxNzAuNjY2NjY3SDE3MC42NjY2Njd2Mjk4LjY2NjY2Nkg4NS4zMzMzMzNWODUuMzMzMzMzek0yNTYgNzY4djQyLjY2NjY2N2E0Mi42NjY2NjcgNDIuNjY2NjY3IDAgMCAxLTg1LjMzMzMzMyAwdi0xNzAuNjY2NjY3YTQyLjY2NjY2NyA0Mi42NjY2NjcgMCAwIDEgODUuMzMzMzMzIDB2NDIuNjY2NjY3aDg1LjMzMzMzM3YtNDIuNjY2NjY3YTEyOCAxMjggMCAwIDAtMjU2IDB2MTcwLjY2NjY2N2ExMjggMTI4IDAgMCAwIDI1NiAwdi00Mi42NjY2Njd6IG0yNTYtODUuMzMzMzMzYTQyLjY2NjY2NyA0Mi42NjY2NjcgMCAxIDEgNDIuNjY2NjY3LTQyLjY2NjY2N2g4NS4zMzMzMzNhMTI4IDEyOCAwIDEgMC0xMjggMTI4IDQyLjY2NjY2NyA0Mi42NjY2NjcgMCAxIDEtNDIuNjY2NjY3IDQyLjY2NjY2N2gtODUuMzMzMzMzYTEyOCAxMjggMCAxIDAgMTI4LTEyOHogbTI5OC42NjY2NjcgMGE0Mi42NjY2NjcgNDIuNjY2NjY3IDAgMSAxIDQyLjY2NjY2Ni00Mi42NjY2NjdoODUuMzMzMzM0YTEyOCAxMjggMCAxIDAtMTI4IDEyOCA0Mi42NjY2NjcgNDIuNjY2NjY3IDAgMSAxLTQyLjY2NjY2NyA0Mi42NjY2NjdoLTg1LjMzMzMzM2ExMjggMTI4IDAgMSAwIDEyOC0xMjh6XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgICAgICAgIENTU+aWh+S7tlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHtzdHlsZS5pdGVtfVwiIGRhdGEtaWQ9XCJqc1wiPlxuICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzPVwiJHtzdHlsZS5pY29ufVwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMTAyNCAxMDI0XCIgdmVyc2lvbj1cIjEuMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPVwiIzhEOTI5Q1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZD1cIk05MzguNjY2NjY3IDI5OC42NjY2Njd2NjQwSDY4Mi42NjY2Njd2LTg1LjMzMzMzNGgxNzAuNjY2NjY2VjMzNC4wOEw2ODkuOTIgMTcwLjY2NjY2N0gxNzAuNjY2NjY3djI5OC42NjY2NjZIODUuMzMzMzMzVjg1LjMzMzMzM2g2NDB6TTUxMiA2ODIuNjY2NjY3YTQyLjY2NjY2NyA0Mi42NjY2NjcgMCAxIDEgNDIuNjY2NjY3LTQyLjY2NjY2N2g4NS4zMzMzMzNhMTI4IDEyOCAwIDEgMC0xMjggMTI4IDQyLjY2NjY2NyA0Mi42NjY2NjcgMCAxIDEtNDIuNjY2NjY3IDQyLjY2NjY2N2gtODUuMzMzMzMzYTEyOCAxMjggMCAxIDAgMTI4LTEyOHogbS0yNTYtMTcwLjY2NjY2N3YyOTguNjY2NjY3YTQyLjY2NjY2NyA0Mi42NjY2NjcgMCAwIDEtODUuMzMzMzMzIDB2LTQyLjY2NjY2N0g4NS4zMzMzMzN2NDIuNjY2NjY3YTEyOCAxMjggMCAwIDAgMjU2IDBWNTEyelwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgICBKU+aWh+S7tlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHtzdHlsZS5pdGVtfVwiIGRhdGEtaWQ9XCJsaW5rXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3M9XCIke3N0eWxlLmljb259XCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNDggNDhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCIjOEQ5MjlDXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkPVwiTTE4LDQ0VjMwYTYsNiwwLDAsMSwxMiwwVjQ0SDI2VjMwYTIsMiwwLDAsMC00LDBWNDRaTTE2LDI4VjI0SDR2NEg4VjQwSDR2NEgxNlY0MEgxMlYyOFpNMzQsNEg0VjIySDhWOEgzMi4zNEw0MCwxNS42NlYyMmg0VjE0Wk0zMiwyNFY0NGg0VjI0Wm0xMiwwSDQwTDM2LDM0bDQsMTBoNEw0MCwzNFpcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICAgICAg5b2T5YmN6ZO+5o6lXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCIke3N0eWxlLml0ZW19XCIgZGF0YS1pZD1cInVybHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzcz1cIiR7c3R5bGUuaWNvbn1cIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA0OCA0OFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbD1cIiM4RDkyOUNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ9XCJNNDQsNDB2NEgzMlYyNGg0VjQwWk00MCwxNS42NlYyMmg0VjE0TDM0LDRINFYyMkg4VjhIMzIuMzRaTTI4LjA4LDM0LjM5LDMwLDQ0SDI2bC0xLjYtOEwyNCwzNkgyMnY4SDE4VjI0aDZhNiw2LDAsMCwxLDQuMDgsMTAuMzlaTTI0LDMyYTIsMiwwLDAsMCwwLTRIMjJ2NFpNMTIsMjRWMzhhMiwyLDAsMCwxLTQsMFYyNEg0VjM4YTYsNiwwLDAsMCwxMiwwVjI0WlwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgICDlpJrkuKrpk77mjqVcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbGk+XG5cbiAgICBgO1xuXG4gICAgbWVudUVsZS5hcHBlbmRDaGlsZChlbnRyeUVsZSk7XG4gICAgbWVudUVsZS5hcHBlbmRDaGlsZChtZW51VWxFbGUpO1xuICAgIHJldHVybiBtZW51RWxlO1xufTtcblxuaWYgKHdpbmRvdy5zZWxmID09PSB3aW5kb3cudG9wKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IHh0b29sc0VsZSA9IG51bGw7XG4gICAgICAgIGdldENmUmVzcG9uc2VIZWFkZXJzKHdpbmRvdy5sb2NhdGlvbi5ocmVmKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oXG4gICAgICAgICAgICAgICAgICAgIGAlYyBJTkZPICVjIOajgOa1i+WIsOW9k+WJjee9keermee7j+i/hyBDbG91ZEZsYXJlIENETiDliqDpgJ8sIOe8k+WtmOa4heeQhuWwj+W3peWFt+W3sue7j+ato+W4uOWKoOi9vSEgJWNgLFxuICAgICAgICAgICAgICAgICAgICBgYmFja2dyb3VuZDojOTA5Mzk5O2JvcmRlcjoxcHggc29saWQgIzkwOTM5OTsgcGFkZGluZzogMXB4OyBib3JkZXItcmFkaXVzOiAycHggMCAwIDJweDsgY29sb3I6ICNmZmY7YCxcbiAgICAgICAgICAgICAgICAgICAgYGJvcmRlcjoxcHggc29saWQgIzkwOTM5OTsgcGFkZGluZzogMXB4OyBib3JkZXItcmFkaXVzOiAwIDJweCAycHggMDsgY29sb3I6ICM5MDkzOTk7YCxcbiAgICAgICAgICAgICAgICAgICAgXCJiYWNrZ3JvdW5kOnRyYW5zcGFyZW50XCJcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHh0b29sc0VsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgY29uc3QgbWVudUVsZSA9IGNyZWF0ZU1lbnUoKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXNvdXJjZXMgPSBnZXRSZXNvdXJjZXMoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwaWNQYW5lbEVsZSA9IGNyZWF0ZVJlc291cmNlUGFuZWwocmVzb3VyY2VzLmltZywgXCJpbWdcIik7XG4gICAgICAgICAgICAgICAgY29uc3QgY3NzUGFuZWxFbGUgPSBjcmVhdGVSZXNvdXJjZVBhbmVsKHJlc291cmNlcy5jc3MsIFwiY3NzXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGpzUGFuZWxFbGUgPSBjcmVhdGVSZXNvdXJjZVBhbmVsKHJlc291cmNlcy5qcywgXCJqc1wiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpbnB1dFBhbmVsRWxlID0gY3JlYXRlSW5wdXRQYW5lbChcInVybHNcIik7XG5cbiAgICAgICAgICAgICAgICAvLyDpgY3ljoZjaGlsZE5vZGVz77yM56e76Zmkc2hvd+agt+W8j1xuICAgICAgICAgICAgICAgIGNvbnN0IGNsb3NlUGFuZWwgPSAobm9kZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKHN0eWxlLnNob3cpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgLy8g5a+56I+c5Y2V6aG555qE54K55Ye75LqL5Lu26L+b6KGM55uR5ZCsXG4gICAgICAgICAgICAgICAgeHRvb2xzRWxlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGUudGFyZ2V0LmRhdGFzZXQuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJpbWdzXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g6YCJ5oup5Zu+54mHXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQYW5lbCh0aGlzLmNoaWxkTm9kZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBpY1BhbmVsRWxlLmNsYXNzTGlzdC5hZGQoc3R5bGUuc2hvdyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF5b3V0TWFzb25yeShcIiN4LXBhbmVsLXdhbGxcIiwgNCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY3NzXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g6YCJ5oupY3NzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQYW5lbCh0aGlzLmNoaWxkTm9kZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzc1BhbmVsRWxlLmNsYXNzTGlzdC5hZGQoc3R5bGUuc2hvdyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwianNcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDpgInmi6lqc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUGFuZWwodGhpcy5jaGlsZE5vZGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqc1BhbmVsRWxlLmNsYXNzTGlzdC5hZGQoc3R5bGUuc2hvdyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwibGlua1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOa4hemZpOW9k+WJjWxpbmtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhckNhY2hlKFt3aW5kb3cubG9jYXRpb24uaHJlZl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInVybHNcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZVBhbmVsKHRoaXMuY2hpbGROb2Rlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g6L6T5YWldXJsc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0UGFuZWxFbGUuY2xhc3NMaXN0LmFkZChzdHlsZS5zaG93KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInBhbmVsLXN1Ym1pdFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g6I635Y+WaW5wdXRQYW5lbEVsZeS4rXRleHRhcmVh55qEdmFsdWUg5Lul5Zue6L2m5YiG5Ymy5oiQ5pWw57uEIC8vIOWmguaenHRleHRhcmVhIOS4uuepuiDliJnov5Tlm57nqbrmlbDnu4RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5wdXRVcmxzID0gaW5wdXRQYW5lbEVsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCJ0ZXh0YXJlYVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnZhbHVlLnNwbGl0KFwiXFxuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKEJvb2xlYW4pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ueHRvb2xzRWxlLnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnB1dFt0eXBlPSdjaGVja2JveCddOmNoZWNrZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXS5tYXAoKGMpID0+IGMudmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyQ2FjaGUoWy4uLmlucHV0VXJscywgLi4uc2VsZWN0ZWRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwicGFuZWwtY2xvc2VcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDpgY3ljoZjaGlsZE5vZGVz77yM56e76Zmkc2hvd+agt+W8j1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUGFuZWwodGhpcy5jaGlsZE5vZGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDpgY3ljobmiYDmnInnmoRjaGVja2JveCzlj5bmtojpgInkuK1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5wdXRbdHlwZT1jaGVja2JveF1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkuZm9yRWFjaCgoY2hlY2tib3gpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tib3guY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOa4heepunRleHRhcmVh55qE5YC8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5xdWVyeVNlbGVjdG9yKFwidGV4dGFyZWFcIikudmFsdWUgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgeHRvb2xzRWxlLmFwcGVuZENoaWxkKG1lbnVFbGUpO1xuICAgICAgICAgICAgICAgIHh0b29sc0VsZS5hcHBlbmRDaGlsZChwaWNQYW5lbEVsZSk7XG4gICAgICAgICAgICAgICAgeHRvb2xzRWxlLmFwcGVuZENoaWxkKGNzc1BhbmVsRWxlKTtcbiAgICAgICAgICAgICAgICB4dG9vbHNFbGUuYXBwZW5kQ2hpbGQoanNQYW5lbEVsZSk7XG4gICAgICAgICAgICAgICAgeHRvb2xzRWxlLmFwcGVuZENoaWxkKGlucHV0UGFuZWxFbGUpO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoeHRvb2xzRWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFBQSxTQUFT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
