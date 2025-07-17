
// ==UserScript==
// @name           Cloudflare 缓存清除工具 Dev
// @namespace      https://github.com/JsBeta/cloudflare-cache-purge/
// @version        1.8.1
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

  var css_248z = ".main_icon__RYCes {\n  display: inline-block;\n  vertical-align: middle;\n}\n.main_icon__RYCes path {\n  fill: #e78930;\n}\n.main_menu__MLtUQ {\n  position: fixed;\n  width: 40px;\n  right: 0;\n  top: 300px;\n  z-index: 100;\n  box-sizing: content-box;\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n}\n.main_menu__MLtUQ:hover ul {\n  right: 0px;\n}\n.main_menu__MLtUQ:hover .main_entry__oOnCr {\n  background: #0a4b85;\n  opacity: 1;\n}\n.main_menu__MLtUQ .main_entry__oOnCr {\n  padding: 3px;\n  cursor: pointer;\n  background: #fff;\n  border-radius: 25% 0 0 25%;\n  margin-bottom: 5px;\n  box-shadow: 2px 6px 10px 0px #0e121629;\n  opacity: 0.5;\n  transition: all 0.3s ease-in-out;\n}\n.main_menu__MLtUQ .main_entry__oOnCr .main_icon__RYCes path {\n  fill: #e78930;\n}\n.main_menu__MLtUQ .main_entry__oOnCr .main_icon__RYCes:hover {\n  rotate: 180deg;\n  transition: all 0.5s ease-in-out;\n}\n.main_menu__MLtUQ ul {\n  position: absolute;\n  transition: all 0.3s ease-in-out;\n  right: -40px;\n  margin: 0;\n  padding: 0;\n}\n.main_menu__MLtUQ li {\n  height: 34px;\n  margin-bottom: 2px;\n  list-style: none;\n  cursor: pointer;\n  position: relative;\n}\n.main_menu__MLtUQ li:hover .main_item__njE-F {\n  width: 85px;\n}\n.main_menu__MLtUQ li:hover .main_icon__RYCes path {\n  fill: #fff;\n}\n.main_menu__MLtUQ .main_item__njE-F {\n  box-sizing: content-box;\n  overflow: hidden;\n  white-space: nowrap;\n  width: 24px;\n  height: 24px;\n  line-height: 24px;\n  padding: 5px 5px 6px 5px;\n  position: absolute;\n  top: 0;\n  right: 0;\n  font-size: 12px;\n  color: #fff;\n  background: #0a4b85;\n  border-radius: 2px 0px 0px 2px;\n  transition: width 0.3s ease-in;\n}\n.main_menu__MLtUQ .main_item__njE-F:hover {\n  background: #e78930;\n}\n.main_menu__MLtUQ .main_item__njE-F .main_icon__RYCes {\n  margin-right: 5px;\n  transform: translateY(-1px);\n}\n.main_panel__t3SIt {\n  display: none;\n  border: 1px solid #ccc;\n  border-radius: 8px;\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);\n  background: #fff;\n  z-index: 9999;\n}\n.main_panel__t3SIt.main_show__HRMDu {\n  display: block;\n}\n.main_panel__t3SIt .main_close__2MGVA {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  cursor: pointer;\n  width: 20px;\n  height: 20px;\n}\n.main_panel__t3SIt .main_head__AwcOE {\n  height: 40px;\n  line-height: 40px;\n  padding: 0 20px;\n  border-bottom: 1px solid #ccc;\n  color: #000;\n  font-size: 16px;\n  font-weight: 600;\n}\n.main_panel__t3SIt .main_foot__-LFyQ {\n  height: 55px;\n  line-height: 40px;\n  padding: 5px 20px;\n  display: flex;\n  justify-content: flex-end;\n  gap: 20px;\n  align-items: center;\n  border-top: 1px solid #ccc;\n}\n.main_panel__t3SIt .main_foot__-LFyQ button {\n  cursor: pointer;\n  height: 35px;\n  line-height: 35px;\n  padding: 0px 30px;\n  background: #e78930;\n  color: #fff;\n  font-size: 14px;\n  border: none;\n  border-radius: 8px;\n}\n.main_panel__t3SIt .main_foot__-LFyQ button[data-id=\"panel-close\"] {\n  background: #ccc;\n  color: #333;\n}\n.main_panel__t3SIt .main_foot__-LFyQ button[data-id=\"panel-close\"]:hover {\n  color: #fff;\n}\n.main_panel__t3SIt .main_foot__-LFyQ button:hover {\n  background: #c46d1c;\n}\n.main_panel__t3SIt .main_wall__0tq2S {\n  position: relative;\n  width: 900px;\n  /* 4列 × (200px + gap) */\n  height: 700px;\n  overflow-y: auto;\n  z-index: 99;\n}\n.main_panel__t3SIt .main_wall__0tq2S .main_item__njE-F {\n  box-sizing: content-box;\n  position: relative;\n  display: inline-block;\n  padding: 10px;\n  vertical-align: top;\n  position: absolute;\n  transition: opacity 0.3s;\n}\n.main_panel__t3SIt .main_wall__0tq2S img {\n  cursor: pointer;\n  box-sizing: content-box;\n  width: 200px;\n  height: auto;\n  display: block;\n}\n.main_panel__t3SIt .main_wall__0tq2S input[type=\"checkbox\"] {\n  position: absolute;\n  top: 5px;\n  left: 5px;\n  z-index: 1;\n}\n.main_panel__t3SIt .main_wall__0tq2S input[type=\"checkbox\"] {\n  display: none;\n}\n.main_panel__t3SIt .main_wall__0tq2S input[type=\"checkbox\"]:checked + img {\n  box-shadow: 0 0 0 2px rgba(245, 148, 3, 0.76);\n}\n.main_panel__t3SIt .main_list__f6SQm {\n  padding: 20px;\n  position: relative;\n  width: 900px;\n  max-height: 600px;\n  overflow-y: auto;\n  z-index: 99;\n}\n.main_panel__t3SIt .main_list__f6SQm .main_item__njE-F {\n  cursor: pointer;\n  display: block;\n  padding: 0 5px;\n  margin-bottom: 8px;\n}\n.main_panel__t3SIt .main_list__f6SQm .main_item__njE-F span {\n  display: inline-block;\n  padding: 5px;\n  margin-left: 5px;\n  border-radius: 5px;\n}\n.main_panel__t3SIt .main_list__f6SQm input[type=\"checkbox\"]:checked + span {\n  box-shadow: 0 0 0 2px rgba(245, 148, 3, 0.76);\n}\n.main_panel__t3SIt .main_inputarea__mzOdr {\n  box-sizing: content-box;\n  padding: 20px;\n  position: relative;\n  width: 600px;\n  max-height: 600px;\n  overflow-y: auto;\n  z-index: 99;\n}\n.main_panel__t3SIt .main_inputarea__mzOdr textarea {\n  padding: 10px;\n  margin-top: 10px;\n  border: 1px solid #e78930;\n  line-height: 2;\n  border-radius: 5px;\n  max-width: 575px;\n  min-width: 575px;\n}\n.main_panel__t3SIt .main_inputarea__mzOdr textarea:focus {\n  outline: none;\n  border: 1px solid #fff;\n  box-shadow: 0 0 0 2px rgba(245, 148, 3, 0.76);\n}\n";
  var style = {"icon":"main_icon__RYCes","menu":"main_menu__MLtUQ","entry":"main_entry__oOnCr","item":"main_item__njE-F","panel":"main_panel__t3SIt","show":"main_show__HRMDu","close":"main_close__2MGVA","head":"main_head__AwcOE","foot":"main_foot__-LFyQ","wall":"main_wall__0tq2S","list":"main_list__f6SQm","inputarea":"main_inputarea__mzOdr"};
  styleInject(css_248z);

  // 配置信息
  let config = {
      apiToken: GM_getValue("cfApiToken", ""),
  };

  // 添加配置菜单
  GM_registerMenuCommand("配置 API Token", function() {
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
  GM_registerMenuCommand("清除当前地址缓存", function() {
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
              onload: function(response) {
                  console.debug("API响应状态:", response.status);
                  const data = JSON.parse(response.responseText);
                  console.debug("完整API响应:", data);
                  if (data.result) {
                      resolve(data.result[0]?.id);
                  } else {
                      resolve(null);
                  }
              },
              onerror: function(error) {
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
          onload: function(response) {
              const result = JSON.parse(response.responseText);
              if (result.success) {
                  alert("缓存清理成功!");
                  // 刷新当前页面
                  window.location.reload();
              } else {
                  alert(
                      "API请求清理缓存失败(onload):" +
                      (result.errors ?.[0]?.message || "Unknown error")
                  );
              }
          },
          onerror: function(error) {
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
              onload: function(response) {
                  // 返回响应头中的cf-cache-status字段
                  const cfCacheStatusMatch = response.responseHeaders.match(/cf-cache-status:\s*(.+)/i);
                  const cfCacheStatusValue = cfCacheStatusMatch ? cfCacheStatusMatch[1] : null;
                  resolve(cfCacheStatusValue);
              },
              onerror: function(error) {
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

      const itemWidth = 200 + spacing * 2; // 每个图片项的宽度（含左右 margin）
      let columnHeights = Array(columnCount).fill(0); // 存储每一列的高度

      items.forEach((item) => {
          // 找到当前最短的一列
          const minHeight = Math.min(...columnHeights);
          const colIndex = columnHeights.indexOf(minHeight);

          // 设置绝对定位位置
          item.style.left = `${colIndex * itemWidth}px`;
          item.style.top = `${minHeight}px`;

          // 更新该列的高度
          const itemHeight = item.offsetHeight;
          columnHeights[colIndex] += itemHeight;
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
      window.addEventListener("load", function() {
          let xtoolsEle = null;
          getCfResponseHeaders(window.location.href).then((res) => {
              if (res) {
                  console.info(
                      `%c INFO %c 检测到当前网站经过 CloudFlare CDN 加速, 缓存清理小工具已经正常加载! %c`,
                      `background:#909399;border:1px solid #909399; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;`,
                      `border:1px solid #909399; padding: 1px; border-radius: 0 2px 2px 0; color: #909399;`,
                      'background:transparent'
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
                  xtoolsEle.addEventListener("click", function(e) {
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

                          case "panel-submit": {
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
                          this.querySelectorAll("input[type=checkbox]").forEach(
                              (checkbox) => {
                                  checkbox.checked = false;
                              }
                          );
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5kZXYudXNlci5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWluamVjdC9kaXN0L3N0eWxlLWluamVjdC5lcy5qcyIsIi4uL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHN0eWxlSW5qZWN0KGNzcywgcmVmKSB7XG4gIGlmICggcmVmID09PSB2b2lkIDAgKSByZWYgPSB7fTtcbiAgdmFyIGluc2VydEF0ID0gcmVmLmluc2VydEF0O1xuXG4gIGlmICghY3NzIHx8IHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuOyB9XG5cbiAgdmFyIGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gIHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gIHN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xuXG4gIGlmIChpbnNlcnRBdCA9PT0gJ3RvcCcpIHtcbiAgICBpZiAoaGVhZC5maXJzdENoaWxkKSB7XG4gICAgICBoZWFkLmluc2VydEJlZm9yZShzdHlsZSwgaGVhZC5maXJzdENoaWxkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICB9XG5cbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgc3R5bGVJbmplY3Q7XG4iLCJpbXBvcnQgc3R5bGUgZnJvbSBcIi4vc3R5bGVzL21haW4ubGVzc1wiO1xuXG4vLyDphY3nva7kv6Hmga9cbmxldCBjb25maWcgPSB7XG4gICAgYXBpVG9rZW46IEdNX2dldFZhbHVlKFwiY2ZBcGlUb2tlblwiLCBcIlwiKSxcbn07XG5cbi8vIOa3u+WKoOmFjee9ruiPnOWNlVxuR01fcmVnaXN0ZXJNZW51Q29tbWFuZChcIumFjee9riBBUEkgVG9rZW5cIiwgZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgYXBpVG9rZW4gPSBwcm9tcHQoXG4gICAgICAgIFwi6K+36L6T5YWl5oKo55qEIENsb3VkZmxhcmUgQVBJIFRva2VuOlwiLFxuICAgICAgICBjb25maWcuYXBpVG9rZW5cbiAgICApO1xuICAgIGlmIChhcGlUb2tlbiAhPT0gbnVsbCkge1xuICAgICAgICBHTV9zZXRWYWx1ZShcImNmQXBpVG9rZW5cIiwgYXBpVG9rZW4pO1xuICAgICAgICBjb25maWcuYXBpVG9rZW4gPSBhcGlUb2tlbjtcbiAgICB9XG59KTtcblxuLy8g5re75Yqg5riF6Zmk57yT5a2Y6I+c5Y2V5ZKM6aG16Z2i5oyJ6ZKuXG5HTV9yZWdpc3Rlck1lbnVDb21tYW5kKFwi5riF6Zmk5b2T5YmN5Zyw5Z2A57yT5a2YXCIsIGZ1bmN0aW9uKCkge1xuICAgIGNsZWFyQ2FjaGUoW3dpbmRvdy5sb2NhdGlvbi5ocmVmXSk7XG59KTtcbi8vIOS/ruaUuemqjOivgemFjee9rlxuZnVuY3Rpb24gdmFsaWRhdGVDb25maWcoKSB7XG4gICAgaWYgKCFjb25maWcuYXBpVG9rZW4pIHtcbiAgICAgICAgYWxlcnQoXCLor7flhYjphY3nva5DbG91ZGZsYXJlIEFQSSBUb2tlbi5cIik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbi8vIOafpeaJvnpvbmVpZFxuYXN5bmMgZnVuY3Rpb24gZ2V0Wm9uZUlkKGRvbWFpbikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmRlYnVnKFwi5q2j5Zyo6I635Y+W5Z+f5ZCNOlwiLCBkb21haW4pO1xuICAgICAgICBHTV94bWxodHRwUmVxdWVzdCh7XG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgICAgICB1cmw6IGBodHRwczovL2FwaS5jbG91ZGZsYXJlLmNvbS9jbGllbnQvdjQvem9uZXM/bmFtZT0ke2RvbWFpbn1gLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHtjb25maWcuYXBpVG9rZW59YCxcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbmxvYWQ6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5kZWJ1ZyhcIkFQSeWTjeW6lOeKtuaAgTpcIiwgcmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShyZXNwb25zZS5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoXCLlrozmlbRBUEnlk43lupQ6XCIsIGRhdGEpO1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLnJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEucmVzdWx0WzBdPy5pZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25lcnJvcjogZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi6I635Y+WWm9uZSBJROWksei0pTpcIiwgZXJyb3IpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuLy8g5riF6Zmk57yT5a2Y5Ye95pWwXG5hc3luYyBmdW5jdGlvbiBjbGVhckNhY2hlKHVybHMpIHtcbiAgICBjb25zb2xlLmRlYnVnKFwi5byA5aeL5riF6Zmk57yT5a2Y5rWB56iLXCIpO1xuICAgIGlmICghdXJscy5sZW5ndGgpIHtcbiAgICAgICAgYWxlcnQoXCLor7fpgInmi6nmiJbogIXovpPlhaXpnIDopoHmuIXpmaTnmoTnvJPlrZjpobnvvIFcIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF2YWxpZGF0ZUNvbmZpZygpKSByZXR1cm47XG4gICAgbGV0IGRvbWFpbiA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpLmhvc3RuYW1lO1xuICAgIC8vIOWOu+mZpGRvbWFpbueahHd3d+WJjee8gFxuICAgIGRvbWFpbiA9IGRvbWFpbi5yZXBsYWNlKC9ed3d3XFwuLywgXCJcIik7XG4gICAgY29uc29sZS5kZWJ1ZyhcIuino+aekOWHuueahOWfn+WQjTpcIiwgZG9tYWluKTtcbiAgICBjb25zdCB6b25lSWQgPSBhd2FpdCBnZXRab25lSWQoZG9tYWluKTtcbiAgICBpZiAoIXpvbmVJZCkge1xuICAgICAgICBhbGVydChcIuacquaJvuWIsOivpeWfn+WQjeWvueW6lOeahENsb3VkZmxhcmUgem9uZSzor7fmo4Dmn6Xln5/lkI3mmK/lkKbmraPnoa7vvIFcIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8g5L2/55So5Yqo5oCBem9uZUlk5Y+R6YCB6K+35rGCLi4uXG4gICAgYXdhaXQgcHVyZ2VDYWNoZSh6b25lSWQsIHVybHMpO1xufVxuXG4vLyDmuIXpmaTnvJPlrZjlsIHoo4VcbmZ1bmN0aW9uIHB1cmdlQ2FjaGUoem9uZ2VJZCwgdXJscykge1xuICAgIGNvbnN0IGFwaVVybCA9IGBodHRwczovL2FwaS5jbG91ZGZsYXJlLmNvbS9jbGllbnQvdjQvem9uZXMvJHt6b25nZUlkfS9wdXJnZV9jYWNoZWA7XG4gICAgY29uc29sZS5kZWJ1ZyhcbiAgICAgICAgXCIlYyBbIOmcgOimgea4hemZpOeahHVybHMgXTogXCIsXG4gICAgICAgIFwiY29sb3I6ICNiZjJjOWY7IGJhY2tncm91bmQ6IHBpbms7IGZvbnQtc2l6ZTogMTNweDtcIixcbiAgICAgICAgdXJsc1xuICAgICk7XG4gICAgR01feG1saHR0cFJlcXVlc3Qoe1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICB1cmw6IGFwaVVybCxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke2NvbmZpZy5hcGlUb2tlbn1gLFxuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIGZpbGVzOiBbLi4udXJsc10sXG4gICAgICAgIH0pLFxuICAgICAgICBvbmxvYWQ6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBKU09OLnBhcnNlKHJlc3BvbnNlLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBhbGVydChcIue8k+WtmOa4heeQhuaIkOWKnyFcIik7XG4gICAgICAgICAgICAgICAgLy8g5Yi35paw5b2T5YmN6aG16Z2iXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydChcbiAgICAgICAgICAgICAgICAgICAgXCJBUEnor7fmsYLmuIXnkIbnvJPlrZjlpLHotKUob25sb2FkKTpcIiArXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQuZXJyb3JzID8uWzBdPy5tZXNzYWdlIHx8IFwiVW5rbm93biBlcnJvclwiKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9uZXJyb3I6IGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICBhbGVydChcIkFQSeivt+axgua4heeQhue8k+WtmOWksei0pShvbmVycm9yKTogXCIgKyBlcnJvci5yZXNwb25zZVRleHQpO1xuICAgICAgICB9LFxuICAgIH0pO1xufVxuXG4vLyDojrflj5blvZPliY3pk77mjqXor7fmsYLlk43lupTlpLRcbmNvbnN0IGdldENmUmVzcG9uc2VIZWFkZXJzID0gYXN5bmMgKHVybCkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICBHTV94bWxodHRwUmVxdWVzdCh7XG4gICAgICAgICAgICBtZXRob2Q6IFwiSEVBRFwiLFxuICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgb25sb2FkOiBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIC8vIOi/lOWbnuWTjeW6lOWktOS4reeahGNmLWNhY2hlLXN0YXR1c+Wtl+autVxuICAgICAgICAgICAgICAgIGNvbnN0IGNmQ2FjaGVTdGF0dXNNYXRjaCA9IHJlc3BvbnNlLnJlc3BvbnNlSGVhZGVycy5tYXRjaCgvY2YtY2FjaGUtc3RhdHVzOlxccyooLispL2kpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNmQ2FjaGVTdGF0dXNWYWx1ZSA9IGNmQ2FjaGVTdGF0dXNNYXRjaCA/IGNmQ2FjaGVTdGF0dXNNYXRjaFsxXSA6IG51bGw7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShjZkNhY2hlU3RhdHVzVmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uZXJyb3I6IGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuiOt+WPluWTjeW6lOWktOWksei0pTpcIiwgZXJyb3IpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5cbi8vIOiOt+WPlui1hOa6kOmTvuaOpVxuY29uc3QgZ2V0UmVzb3VyY2VzID0gKCkgPT4ge1xuICAgIGNvbnN0IGJsYWNrbGlzdGVkUGF0dGVybnMgPSBbXG4gICAgICAgIC9hbmFseXRpY3NcXC5leGFtcGxlXFwuY29tLyxcbiAgICAgICAgL3d3d1xcLmNsYXJpdHkvLFxuICAgICAgICAvd3d3XFwuZ29vZ2xlLyxcbiAgICAgICAgL2FwcFxcLnRlcm1seS8sXG4gICAgXTtcbiAgICBjb25zdCBqc0xpbmtzID0gQXJyYXkuZnJvbShkb2N1bWVudC5zY3JpcHRzKVxuICAgICAgICAubWFwKChzKSA9PiBzLnNyYylcbiAgICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgICAuZmlsdGVyKFxuICAgICAgICAgICAgKHVybCkgPT4gIWJsYWNrbGlzdGVkUGF0dGVybnMuc29tZSgocGF0dGVybikgPT4gcGF0dGVybi50ZXN0KHVybCkpXG4gICAgICAgICk7XG4gICAgY29uc3QgY3NzTGlua3MgPSBBcnJheS5mcm9tKFxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaW5rW3JlbD1cInN0eWxlc2hlZXRcIl0nKVxuICAgICkubWFwKChsaW5rKSA9PiBsaW5rLmhyZWYpO1xuICAgIGNvbnN0IGltZ0xpbmtzID0gQXJyYXkuZnJvbShkb2N1bWVudC5pbWFnZXMpXG4gICAgICAgIC5tYXAoKGltZykgPT4gaW1nLnNyYylcbiAgICAgICAgLmZpbHRlcihCb29sZWFuKTtcbiAgICBjb25zdCBjc3NCZ0ltYWdlcyA9IG5ldyBTZXQoKTtcbiAgICBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIqXCIpKS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICBjb25zdCBiZyA9IGdldENvbXB1dGVkU3R5bGUoZWwpLmJhY2tncm91bmRJbWFnZTtcbiAgICAgICAgY29uc3QgbSA9IGJnLm1hdGNoKC91cmxcXChbXCInXT8oLio/KVtcIiddP1xcKS8pO1xuICAgICAgICBpZiAobSAmJiBtWzFdKSBjc3NCZ0ltYWdlcy5hZGQobVsxXSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBhbGxJbWFnZXMgPSBBcnJheS5mcm9tKG5ldyBTZXQoWy4uLmltZ0xpbmtzLCAuLi5jc3NCZ0ltYWdlc10pKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBqczoganNMaW5rcyxcbiAgICAgICAgY3NzOiBjc3NMaW5rcyxcbiAgICAgICAgaW1nOiBhbGxJbWFnZXMsXG4gICAgfTtcbn07XG5cbi8vIOWbvueJh+eAkeW4g+a1geW4g+WxgFxuY29uc3QgbGF5b3V0TWFzb25yeSA9IChjb250YWluZXJTZWxlY3RvciwgY29sdW1uQ291bnQgPSA0LCBzcGFjaW5nID0gMTApID0+IHtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lclNlbGVjdG9yKTtcbiAgICBpZiAoIWNvbnRhaW5lcikgcmV0dXJuO1xuXG4gICAgY29uc3QgaXRlbXMgPSBBcnJheS5mcm9tKGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwibGFiZWxcIikpO1xuICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgIGNvbnN0IGl0ZW1XaWR0aCA9IDIwMCArIHNwYWNpbmcgKiAyOyAvLyDmr4/kuKrlm77niYfpobnnmoTlrr3luqbvvIjlkKvlt6blj7MgbWFyZ2lu77yJXG4gICAgbGV0IGNvbHVtbkhlaWdodHMgPSBBcnJheShjb2x1bW5Db3VudCkuZmlsbCgwKTsgLy8g5a2Y5YKo5q+P5LiA5YiX55qE6auY5bqmXG5cbiAgICBpdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIC8vIOaJvuWIsOW9k+WJjeacgOefreeahOS4gOWIl1xuICAgICAgICBjb25zdCBtaW5IZWlnaHQgPSBNYXRoLm1pbiguLi5jb2x1bW5IZWlnaHRzKTtcbiAgICAgICAgY29uc3QgY29sSW5kZXggPSBjb2x1bW5IZWlnaHRzLmluZGV4T2YobWluSGVpZ2h0KTtcblxuICAgICAgICAvLyDorr7nva7nu53lr7nlrprkvY3kvY3nva5cbiAgICAgICAgaXRlbS5zdHlsZS5sZWZ0ID0gYCR7Y29sSW5kZXggKiBpdGVtV2lkdGh9cHhgO1xuICAgICAgICBpdGVtLnN0eWxlLnRvcCA9IGAke21pbkhlaWdodH1weGA7XG5cbiAgICAgICAgLy8g5pu05paw6K+l5YiX55qE6auY5bqmXG4gICAgICAgIGNvbnN0IGl0ZW1IZWlnaHQgPSBpdGVtLm9mZnNldEhlaWdodDtcbiAgICAgICAgY29sdW1uSGVpZ2h0c1tjb2xJbmRleF0gKz0gaXRlbUhlaWdodDtcbiAgICB9KTtcbn07XG5cbi8vIOWIm+W7uui1hOa6kOWIl+ihqOmdouadvztcbmNvbnN0IGNyZWF0ZVJlc291cmNlUGFuZWwgPSAocGljQXJyYXksIHR5cGUpID0+IHtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKHN0eWxlLnBhbmVsKTtcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiJHtzdHlsZS5oZWFkfVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0aXRsZVwiPui1hOa6kOWIl+ihqDwvc3Bhbj5cbiAgICAgICAgICAgIDxzdmcgZGF0YS1pZD1cInBhbmVsLWNsb3NlXCIgY2xhc3M9XCIke1xuICAgICAgICAgICAgICAgIHN0eWxlLmNsb3NlXG4gICAgICAgICAgICB9XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNDggNDhcIj5cbiAgICAgICAgICAgICAgICA8cG9seWdvblxuICAgICAgICAgICAgICAgICAgICBkYXRhLWlkPVwicGFuZWwtY2xvc2VcIlxuICAgICAgICAgICAgICAgICAgICBwb2ludHM9XCIzNS4zMSA5Ljg2IDI0IDIxLjE3IDEyLjY5IDkuODYgOS44NiAxMi42OSAyMS4xNyAyNCA5Ljg2IDM1LjMxIDEyLjY5IDM4LjE0IDI0IDI2LjgzIDM1LjMxIDM4LjE0IDM4LjE0IDM1LjMxIDI2LjgzIDI0IDM4LjE0IDEyLjY5IDM1LjMxIDkuODZcIiAvPlxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGlkPVwiJHt0eXBlID09PSBcImltZ1wiID8gXCJ4LXBhbmVsLXdhbGxcIiA6IFwiXCJ9XCIgXG4gICAgICAgIGNsYXNzPVwiJHt0eXBlID09PSBcImltZ1wiID8gc3R5bGUud2FsbCA6IHN0eWxlLmxpc3R9XCI+XG4gICAgICAgICAgICAke3BpY0FycmF5XG4gICAgICAgICAgICAgICAgLm1hcChcbiAgICAgICAgICAgICAgICAgICAgKHVybCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cIiR7c3R5bGUuaXRlbX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgdmFsdWU9XCIke3VybH1cIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9PT0gXCJpbWdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBgPGltZyBzcmM9XCIke3VybH1cIiAvPmBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYDxzcGFuPiR7dXJsfTwvc3Bhbj5gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAuam9pbihcIlxcblwiKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCIke3N0eWxlLmZvb3R9XCI+XG4gICAgICAgICAgICA8YnV0dG9uICBkYXRhLWlkPVwicGFuZWwtY2xvc2VcIj7lj5bmtog8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gZGF0YS1pZD1cInBhbmVsLXN1Ym1pdFwiIGRhdGEtdHlwZT1cIiR7dHlwZX1cIj7muIXpmaQ8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgXG5gO1xuICAgIHJldHVybiBjb250YWluZXI7XG59O1xuXG4vLyDliJvlu7rovpPlhaXmoYbpnaLmnb87XG5jb25zdCBjcmVhdGVJbnB1dFBhbmVsID0gKHR5cGUpID0+IHtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKHN0eWxlLnBhbmVsKTtcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiJHtzdHlsZS5oZWFkfVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0aXRsZVwiPua4hemZpOWkmuS4qnVybOmTvuaOpTwvc3Bhbj5cbiAgICAgICAgICAgIDxzdmcgZGF0YS1pZD1cInBhbmVsLWNsb3NlXCIgY2xhc3M9XCIke3N0eWxlLmNsb3NlfVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDQ4IDQ4XCI+XG4gICAgICAgICAgICAgICAgPHBvbHlnb25cbiAgICAgICAgICAgICAgICAgICAgZGF0YS1pZD1cInBhbmVsLWNsb3NlXCJcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRzPVwiMzUuMzEgOS44NiAyNCAyMS4xNyAxMi42OSA5Ljg2IDkuODYgMTIuNjkgMjEuMTcgMjQgOS44NiAzNS4zMSAxMi42OSAzOC4xNCAyNCAyNi44MyAzNS4zMSAzOC4xNCAzOC4xNCAzNS4zMSAyNi44MyAyNCAzOC4xNCAxMi42OSAzNS4zMSA5Ljg2XCIgLz5cbiAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBcbiAgICAgICAgY2xhc3M9XCIke3N0eWxlLmlucHV0YXJlYX1cIj5cbiAgICAgICAgICAgIDx0ZXh0YXJlYSBjb2xzPVwiODBcIiByb3dzPVwiNlwiIG5hbWU9XCJpbnB1dGFyZWFcIiBwbGFjZWhvbGRlcj1cIui+k+WFpXVybOmTvuaOpSzlpJrkuKrpk77mjqXpnIDopoHlj6blj5bkuIDooYxcIj48L3RleHRhcmVhPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIiR7c3R5bGUuZm9vdH1cIj5cbiAgICAgICAgICAgIDxidXR0b24gIGRhdGEtaWQ9XCJwYW5lbC1jbG9zZVwiPuWPlua2iDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLWlkPVwicGFuZWwtc3VibWl0XCIgZGF0YS10eXBlPVwiJHt0eXBlfVwiPua4hemZpDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICBcbmA7XG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcbn07XG5cbi8vIOWIm+W7uuS+p+i+ueiPnOWNlVxuY29uc3QgY3JlYXRlTWVudSA9ICgpID0+IHtcbiAgICBjb25zdCBtZW51RWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBtZW51RWxlLmNsYXNzTGlzdC5hZGQoc3R5bGUubWVudSk7XG4gICAgY29uc3QgZW50cnlFbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpOyAvLyDlhaXlj6PmjInpkq5cbiAgICBlbnRyeUVsZS5jbGFzc0xpc3QuYWRkKHN0eWxlLmVudHJ5KTtcbiAgICBlbnRyeUVsZS5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8c3ZnIGNsYXNzPVwiJHtzdHlsZS5pY29ufVwiIHdpZHRoPVwiMzZcIiBoZWlnaHQ9XCIzNlwiIHZpZXdCb3g9XCIwIDAgMTAyNCAxMDI0XCIgdmVyc2lvbj1cIjEuMVwiXG4gICAgICAgICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCIjOEQ5MjlDXCJcbiAgICAgICAgICAgICAgICAgICAgZD1cIk04OTYgNTEyQTM4NCAzODQgMCAwIDAgNTMzLjMzMzMzMyAxMjkuMDY2NjY3aC0yMS4zMzMzMzNBMzg0IDM4NCAwIDAgMCAxMjkuMDY2NjY3IDQ5MC42NjY2Njd2MjEuMzMzMzMzQTM4NCAzODQgMCAwIDAgNDkwLjY2NjY2NyA4OTZoMjEuMzMzMzMzYTM4NCAzODQgMCAwIDAgMzg0LTM2Mi42NjY2Njd2LTIxLjMzMzMzM3ogbS04NS4zMzMzMzMgMHYxMy4wMTMzMzNhMTI4IDEyOCAwIDAgMS0yNDkuODEzMzM0IDIzLjg5MzMzNEEyMTMuMzMzMzMzIDIxMy4zMzMzMzMgMCAwIDAgNzIxLjA2NjY2NyAyOTguNjY2NjY3IDI5OC42NjY2NjcgMjk4LjY2NjY2NyAwIDAgMSA4MTAuNjY2NjY3IDUxMnpNNTEyIDIxMy4zMzMzMzNoMTMuMDEzMzMzYTEyOCAxMjggMCAwIDEgMjMuODkzMzM0IDI0OS44MTMzMzRBMjEzLjMzMzMzMyAyMTMuMzMzMzMzIDAgMCAwIDI5OC42NjY2NjcgMzAyLjkzMzMzMyAyOTguNjY2NjY3IDI5OC42NjY2NjcgMCAwIDEgNTEyIDIxMy4zMzMzMzN6TTIxMy4zMzMzMzMgNTEydi0xMy4wMTMzMzNhMTI4IDEyOCAwIDAgMSAyNDkuODEzMzM0LTIzLjg5MzMzNEEyMTMuMzMzMzMzIDIxMy4zMzMzMzMgMCAwIDAgMzAyLjkzMzMzMyA3MjUuMzMzMzMzIDI5OC42NjY2NjcgMjk4LjY2NjY2NyAwIDAgMSAyMTMuMzMzMzMzIDUxMnogbTI5OC42NjY2NjcgMjk4LjY2NjY2N2gtMTMuMDEzMzMzYTEyOCAxMjggMCAwIDEtMjMuODkzMzM0LTI0OS44MTMzMzRBMjEzLjMzMzMzMyAyMTMuMzMzMzMzIDAgMCAwIDcyNS4zMzMzMzMgNzIxLjA2NjY2NyAyOTguNjY2NjY3IDI5OC42NjY2NjcgMCAwIDEgNTEyIDgxMC42NjY2Njd6XCIgLz5cbiAgICAgICAgICAgIDwvc3ZnPmA7XG4gICAgY29uc3QgbWVudVVsRWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpOyAvLyDlhaXlj6Poj5zljZXliJfooahcbiAgICBtZW51VWxFbGUuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCIke3N0eWxlLml0ZW19XCIgZGF0YS1pZD1cImltZ3NcIj5cbiAgICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzcz1cIiR7c3R5bGUuaWNvbn1cIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDEwMjQgMTAyNFwiIHZlcnNpb249XCIxLjFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbD1cIiM4RDkyOUNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ9XCJNODUzLjMzMzMzMyA2ODIuNjY2NjY3di00Mi42NjY2NjdhNDIuNjY2NjY3IDQyLjY2NjY2NyAwIDAgMC04NS4zMzMzMzMgMHYxNzAuNjY2NjY3YTQyLjY2NjY2NyA0Mi42NjY2NjcgMCAwIDAgODUuMzMzMzMzIDBoLTQyLjY2NjY2NnYtODUuMzMzMzM0aDEyOHY4NS4zMzMzMzRhMTI4IDEyOCAwIDAgMS0yNTYgMHYtMTcwLjY2NjY2N2ExMjggMTI4IDAgMCAxIDI1NiAwdjQyLjY2NjY2N3ogbS01MTItODUuMzMzMzM0di04NS4zMzMzMzNIODUuMzMzMzMzdjg1LjMzMzMzM2g4NS4zMzMzMzR2MjU2SDg1LjMzMzMzM3Y4NS4zMzMzMzRoMjU2di04NS4zMzMzMzRoLTg1LjMzMzMzM1Y1OTcuMzMzMzMzeiBtMjk4LjY2NjY2Ny04NS4zMzMzMzN2NDI2LjY2NjY2N2gtODUuMzMzMzMzVjY1NC4yOTMzMzNsLTQyLjY2NjY2NyA1Ni43NDY2NjctNDIuNjY2NjY3LTU2Ljc0NjY2N1Y5MzguNjY2NjY3aC04NS4zMzMzMzNWNTEyaDg1LjMzMzMzM2w0Mi42NjY2NjcgNTYuOTZMNTU0LjY2NjY2NyA1MTJ6IG04NS4zMzMzMzMtNDI2LjY2NjY2N2wyMTMuMzMzMzM0IDIxMy4zMzMzMzR2MTcwLjY2NjY2NmgtODUuMzMzMzM0di0xMzUuMjUzMzMzTDY4OS45MiAxNzAuNjY2NjY3SDE3MC42NjY2Njd2Mjk4LjY2NjY2Nkg4NS4zMzMzMzNWODUuMzMzMzMzelwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgICDlm77niYfmlofku7ZcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7c3R5bGUuaXRlbX1cIiBkYXRhLWlkPVwiY3NzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3M9XCIke3N0eWxlLmljb259XCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAxMDI0IDEwMjRcIiB2ZXJzaW9uPVwiMS4xXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCIjOEQ5MjlDXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkPVwiTTcyNS4zMzMzMzMgODUuMzMzMzMzbDIxMy4zMzMzMzQgMjEzLjMzMzMzNHYxNzAuNjY2NjY2aC04NS4zMzMzMzR2LTEzNS4yNTMzMzNMNjg5LjkyIDE3MC42NjY2NjdIMTcwLjY2NjY2N3YyOTguNjY2NjY2SDg1LjMzMzMzM1Y4NS4zMzMzMzN6TTI1NiA3Njh2NDIuNjY2NjY3YTQyLjY2NjY2NyA0Mi42NjY2NjcgMCAwIDEtODUuMzMzMzMzIDB2LTE3MC42NjY2NjdhNDIuNjY2NjY3IDQyLjY2NjY2NyAwIDAgMSA4NS4zMzMzMzMgMHY0Mi42NjY2NjdoODUuMzMzMzMzdi00Mi42NjY2NjdhMTI4IDEyOCAwIDAgMC0yNTYgMHYxNzAuNjY2NjY3YTEyOCAxMjggMCAwIDAgMjU2IDB2LTQyLjY2NjY2N3ogbTI1Ni04NS4zMzMzMzNhNDIuNjY2NjY3IDQyLjY2NjY2NyAwIDEgMSA0Mi42NjY2NjctNDIuNjY2NjY3aDg1LjMzMzMzM2ExMjggMTI4IDAgMSAwLTEyOCAxMjggNDIuNjY2NjY3IDQyLjY2NjY2NyAwIDEgMS00Mi42NjY2NjcgNDIuNjY2NjY3aC04NS4zMzMzMzNhMTI4IDEyOCAwIDEgMCAxMjgtMTI4eiBtMjk4LjY2NjY2NyAwYTQyLjY2NjY2NyA0Mi42NjY2NjcgMCAxIDEgNDIuNjY2NjY2LTQyLjY2NjY2N2g4NS4zMzMzMzRhMTI4IDEyOCAwIDEgMC0xMjggMTI4IDQyLjY2NjY2NyA0Mi42NjY2NjcgMCAxIDEtNDIuNjY2NjY3IDQyLjY2NjY2N2gtODUuMzMzMzMzYTEyOCAxMjggMCAxIDAgMTI4LTEyOHpcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICAgICAgQ1NT5paH5Lu2XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCIke3N0eWxlLml0ZW19XCIgZGF0YS1pZD1cImpzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3M9XCIke3N0eWxlLmljb259XCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAxMDI0IDEwMjRcIiB2ZXJzaW9uPVwiMS4xXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCIjOEQ5MjlDXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkPVwiTTkzOC42NjY2NjcgMjk4LjY2NjY2N3Y2NDBINjgyLjY2NjY2N3YtODUuMzMzMzM0aDE3MC42NjY2NjZWMzM0LjA4TDY4OS45MiAxNzAuNjY2NjY3SDE3MC42NjY2Njd2Mjk4LjY2NjY2Nkg4NS4zMzMzMzNWODUuMzMzMzMzaDY0MHpNNTEyIDY4Mi42NjY2NjdhNDIuNjY2NjY3IDQyLjY2NjY2NyAwIDEgMSA0Mi42NjY2NjctNDIuNjY2NjY3aDg1LjMzMzMzM2ExMjggMTI4IDAgMSAwLTEyOCAxMjggNDIuNjY2NjY3IDQyLjY2NjY2NyAwIDEgMS00Mi42NjY2NjcgNDIuNjY2NjY3aC04NS4zMzMzMzNhMTI4IDEyOCAwIDEgMCAxMjgtMTI4eiBtLTI1Ni0xNzAuNjY2NjY3djI5OC42NjY2NjdhNDIuNjY2NjY3IDQyLjY2NjY2NyAwIDAgMS04NS4zMzMzMzMgMHYtNDIuNjY2NjY3SDg1LjMzMzMzM3Y0Mi42NjY2NjdhMTI4IDEyOCAwIDAgMCAyNTYgMFY1MTJ6XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgICAgICAgIEpT5paH5Lu2XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCIke3N0eWxlLml0ZW19XCIgZGF0YS1pZD1cImxpbmtcIj5cbiAgICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzcz1cIiR7c3R5bGUuaWNvbn1cIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA0OCA0OFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbD1cIiM4RDkyOUNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ9XCJNMTgsNDRWMzBhNiw2LDAsMCwxLDEyLDBWNDRIMjZWMzBhMiwyLDAsMCwwLTQsMFY0NFpNMTYsMjhWMjRINHY0SDhWNDBINHY0SDE2VjQwSDEyVjI4Wk0zNCw0SDRWMjJIOFY4SDMyLjM0TDQwLDE1LjY2VjIyaDRWMTRaTTMyLDI0VjQ0aDRWMjRabTEyLDBINDBMMzYsMzRsNCwxMGg0TDQwLDM0WlwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgICDlvZPliY3pk77mjqVcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7c3R5bGUuaXRlbX1cIiBkYXRhLWlkPVwidXJsc1wiPlxuICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzPVwiJHtzdHlsZS5pY29ufVwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDQ4IDQ4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPVwiIzhEOTI5Q1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZD1cIk00NCw0MHY0SDMyVjI0aDRWNDBaTTQwLDE1LjY2VjIyaDRWMTRMMzQsNEg0VjIySDhWOEgzMi4zNFpNMjguMDgsMzQuMzksMzAsNDRIMjZsLTEuNi04TDI0LDM2SDIydjhIMThWMjRoNmE2LDYsMCwwLDEsNC4wOCwxMC4zOVpNMjQsMzJhMiwyLDAsMCwwLDAtNEgyMnY0Wk0xMiwyNFYzOGEyLDIsMCwwLDEtNCwwVjI0SDRWMzhhNiw2LDAsMCwwLDEyLDBWMjRaXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgICAgICAgIOWkmuS4qumTvuaOpVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9saT5cblxuICAgIGA7XG5cbiAgICBtZW51RWxlLmFwcGVuZENoaWxkKGVudHJ5RWxlKTtcbiAgICBtZW51RWxlLmFwcGVuZENoaWxkKG1lbnVVbEVsZSk7XG4gICAgcmV0dXJuIG1lbnVFbGU7XG59O1xuXG5pZiAod2luZG93LnNlbGYgPT09IHdpbmRvdy50b3ApIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCB4dG9vbHNFbGUgPSBudWxsXG4gICAgICAgIGdldENmUmVzcG9uc2VIZWFkZXJzKHdpbmRvdy5sb2NhdGlvbi5ocmVmKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oXG4gICAgICAgICAgICAgICAgICAgIGAlYyBJTkZPICVjIOajgOa1i+WIsOW9k+WJjee9keermee7j+i/hyBDbG91ZEZsYXJlIENETiDliqDpgJ8sIOe8k+WtmOa4heeQhuWwj+W3peWFt+W3sue7j+ato+W4uOWKoOi9vSEgJWNgLFxuICAgICAgICAgICAgICAgICAgICBgYmFja2dyb3VuZDojOTA5Mzk5O2JvcmRlcjoxcHggc29saWQgIzkwOTM5OTsgcGFkZGluZzogMXB4OyBib3JkZXItcmFkaXVzOiAycHggMCAwIDJweDsgY29sb3I6ICNmZmY7YCxcbiAgICAgICAgICAgICAgICAgICAgYGJvcmRlcjoxcHggc29saWQgIzkwOTM5OTsgcGFkZGluZzogMXB4OyBib3JkZXItcmFkaXVzOiAwIDJweCAycHggMDsgY29sb3I6ICM5MDkzOTk7YCxcbiAgICAgICAgICAgICAgICAgICAgJ2JhY2tncm91bmQ6dHJhbnNwYXJlbnQnXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB4dG9vbHNFbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1lbnVFbGUgPSBjcmVhdGVNZW51KCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzb3VyY2VzID0gZ2V0UmVzb3VyY2VzKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcGljUGFuZWxFbGUgPSBjcmVhdGVSZXNvdXJjZVBhbmVsKHJlc291cmNlcy5pbWcsIFwiaW1nXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNzc1BhbmVsRWxlID0gY3JlYXRlUmVzb3VyY2VQYW5lbChyZXNvdXJjZXMuY3NzLCBcImNzc1wiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBqc1BhbmVsRWxlID0gY3JlYXRlUmVzb3VyY2VQYW5lbChyZXNvdXJjZXMuanMsIFwianNcIik7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5wdXRQYW5lbEVsZSA9IGNyZWF0ZUlucHV0UGFuZWwoXCJ1cmxzXCIpO1xuXG4gICAgICAgICAgICAgICAgLy8g6YGN5Y6GY2hpbGROb2Rlc++8jOenu+mZpHNob3fmoLflvI9cbiAgICAgICAgICAgICAgICBjb25zdCBjbG9zZVBhbmVsID0gKG5vZGVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuY2xhc3NMaXN0LnJlbW92ZShzdHlsZS5zaG93KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIC8vIOWvueiPnOWNlemhueeahOeCueWHu+S6i+S7tui/m+ihjOebkeWQrFxuICAgICAgICAgICAgICAgIHh0b29sc0VsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGUudGFyZ2V0LmRhdGFzZXQuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJpbWdzXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g6YCJ5oup5Zu+54mHXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQYW5lbCh0aGlzLmNoaWxkTm9kZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBpY1BhbmVsRWxlLmNsYXNzTGlzdC5hZGQoc3R5bGUuc2hvdyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF5b3V0TWFzb25yeShcIiN4LXBhbmVsLXdhbGxcIiwgNCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY3NzXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g6YCJ5oupY3NzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQYW5lbCh0aGlzLmNoaWxkTm9kZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzc1BhbmVsRWxlLmNsYXNzTGlzdC5hZGQoc3R5bGUuc2hvdyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwianNcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDpgInmi6lqc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUGFuZWwodGhpcy5jaGlsZE5vZGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqc1BhbmVsRWxlLmNsYXNzTGlzdC5hZGQoc3R5bGUuc2hvdyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwibGlua1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOa4hemZpOW9k+WJjWxpbmtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhckNhY2hlKFt3aW5kb3cubG9jYXRpb24uaHJlZl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInVybHNcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZVBhbmVsKHRoaXMuY2hpbGROb2Rlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g6L6T5YWldXJsc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0UGFuZWxFbGUuY2xhc3NMaXN0LmFkZChzdHlsZS5zaG93KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInBhbmVsLXN1Ym1pdFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g6I635Y+WaW5wdXRQYW5lbEVsZeS4rXRleHRhcmVh55qEdmFsdWUg5Lul5Zue6L2m5YiG5Ymy5oiQ5pWw57uEIC8vIOWmguaenHRleHRhcmVhIOS4uuepuiDliJnov5Tlm57nqbrmlbDnu4RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbnB1dFVybHMgPSBpbnB1dFBhbmVsRWxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKFwidGV4dGFyZWFcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnZhbHVlLnNwbGl0KFwiXFxuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoQm9vbGVhbik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ueHRvb2xzRWxlLnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlucHV0W3R5cGU9J2NoZWNrYm94J106Y2hlY2tlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXS5tYXAoKGMpID0+IGMudmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJDYWNoZShbLi4uaW5wdXRVcmxzLCAuLi5zZWxlY3RlZF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJwYW5lbC1jbG9zZVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g6YGN5Y6GY2hpbGROb2Rlc++8jOenu+mZpHNob3fmoLflvI9cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUGFuZWwodGhpcy5jaGlsZE5vZGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOmBjeWOhuaJgOacieeahGNoZWNrYm94LOWPlua2iOmAieS4rVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRbdHlwZT1jaGVja2JveF1cIikuZm9yRWFjaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2hlY2tib3gpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tib3guY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDmuIXnqbp0ZXh0YXJlYeeahOWAvFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5xdWVyeVNlbGVjdG9yKFwidGV4dGFyZWFcIikudmFsdWUgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgeHRvb2xzRWxlLmFwcGVuZENoaWxkKG1lbnVFbGUpO1xuICAgICAgICAgICAgICAgIHh0b29sc0VsZS5hcHBlbmRDaGlsZChwaWNQYW5lbEVsZSk7XG4gICAgICAgICAgICAgICAgeHRvb2xzRWxlLmFwcGVuZENoaWxkKGNzc1BhbmVsRWxlKTtcbiAgICAgICAgICAgICAgICB4dG9vbHNFbGUuYXBwZW5kQ2hpbGQoanNQYW5lbEVsZSk7XG4gICAgICAgICAgICAgICAgeHRvb2xzRWxlLmFwcGVuZENoaWxkKGlucHV0UGFuZWxFbGUpO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoeHRvb2xzRWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBQUEsU0FBUyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRTtFQUMvQixFQUFFLEtBQUssR0FBRyxLQUFLLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7RUFDakMsRUFBRSxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDO0FBQzlCO0VBQ0EsRUFBRSxJQUFJLENBQUMsR0FBRyxJQUFJLE9BQU8sUUFBUSxLQUFLLFdBQVcsRUFBRSxFQUFFLE9BQU8sRUFBRTtBQUMxRDtFQUNBLEVBQUUsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdkUsRUFBRSxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0VBQzlDLEVBQUUsS0FBSyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7QUFDMUI7RUFDQSxFQUFFLElBQUksUUFBUSxLQUFLLEtBQUssRUFBRTtFQUMxQixJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtFQUN6QixNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztFQUNo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
