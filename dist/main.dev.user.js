
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
          console.log("正在获取域名:", domain);
          GM_xmlhttpRequest({
              method: "GET",
              url: `https://api.cloudflare.com/client/v4/zones?name=${domain}`,
              headers: {
                  Authorization: `Bearer ${config.apiToken}`,
                  "Content-Type": "application/json",
              },
              onload: function(response) {
                  console.log("API响应状态:", response.status);
                  const data = JSON.parse(response.responseText);
                  console.log("完整API响应:", data);
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
      console.log("开始清除缓存流程");
      if (!urls.length) {
          alert("请选择或者输入需要清除的缓存项！");
          return;
      }
      if (!validateConfig()) return;
      let domain = new URL(window.location.href).hostname;
      // 去除domain的www前缀
      domain = domain.replace(/^www\./, "");
      console.log("解析出的域名:", domain);
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
      console.log(
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
          const xtoolsEle = document.createElement("div");
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

          getCfResponseHeaders(window.location.href).then((res) => {
              console.log('[ res ] >', res);
              if (res) {
                  document.body.appendChild(xtoolsEle);
              }
          });
      });
  }

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5kZXYudXNlci5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWluamVjdC9kaXN0L3N0eWxlLWluamVjdC5lcy5qcyIsIi4uL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHN0eWxlSW5qZWN0KGNzcywgcmVmKSB7XG4gIGlmICggcmVmID09PSB2b2lkIDAgKSByZWYgPSB7fTtcbiAgdmFyIGluc2VydEF0ID0gcmVmLmluc2VydEF0O1xuXG4gIGlmICghY3NzIHx8IHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuOyB9XG5cbiAgdmFyIGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gIHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gIHN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xuXG4gIGlmIChpbnNlcnRBdCA9PT0gJ3RvcCcpIHtcbiAgICBpZiAoaGVhZC5maXJzdENoaWxkKSB7XG4gICAgICBoZWFkLmluc2VydEJlZm9yZShzdHlsZSwgaGVhZC5maXJzdENoaWxkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICB9XG5cbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgc3R5bGVJbmplY3Q7XG4iLCJpbXBvcnQgc3R5bGUgZnJvbSBcIi4vc3R5bGVzL21haW4ubGVzc1wiO1xuXG4vLyDphY3nva7kv6Hmga9cbmxldCBjb25maWcgPSB7XG4gICAgYXBpVG9rZW46IEdNX2dldFZhbHVlKFwiY2ZBcGlUb2tlblwiLCBcIlwiKSxcbn07XG5cbi8vIOa3u+WKoOmFjee9ruiPnOWNlVxuR01fcmVnaXN0ZXJNZW51Q29tbWFuZChcIumFjee9riBBUEkgVG9rZW5cIiwgZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgYXBpVG9rZW4gPSBwcm9tcHQoXG4gICAgICAgIFwi6K+36L6T5YWl5oKo55qEIENsb3VkZmxhcmUgQVBJIFRva2VuOlwiLFxuICAgICAgICBjb25maWcuYXBpVG9rZW5cbiAgICApO1xuICAgIGlmIChhcGlUb2tlbiAhPT0gbnVsbCkge1xuICAgICAgICBHTV9zZXRWYWx1ZShcImNmQXBpVG9rZW5cIiwgYXBpVG9rZW4pO1xuICAgICAgICBjb25maWcuYXBpVG9rZW4gPSBhcGlUb2tlbjtcbiAgICB9XG59KTtcblxuLy8g5re75Yqg5riF6Zmk57yT5a2Y6I+c5Y2V5ZKM6aG16Z2i5oyJ6ZKuXG5HTV9yZWdpc3Rlck1lbnVDb21tYW5kKFwi5riF6Zmk5b2T5YmN5Zyw5Z2A57yT5a2YXCIsIGZ1bmN0aW9uKCkge1xuICAgIGNsZWFyQ2FjaGUoW3dpbmRvdy5sb2NhdGlvbi5ocmVmXSk7XG59KTtcbi8vIOS/ruaUuemqjOivgemFjee9rlxuZnVuY3Rpb24gdmFsaWRhdGVDb25maWcoKSB7XG4gICAgaWYgKCFjb25maWcuYXBpVG9rZW4pIHtcbiAgICAgICAgYWxlcnQoXCLor7flhYjphY3nva5DbG91ZGZsYXJlIEFQSSBUb2tlbi5cIik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbi8vIOafpeaJvnpvbmVpZFxuYXN5bmMgZnVuY3Rpb24gZ2V0Wm9uZUlkKGRvbWFpbikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIuato+WcqOiOt+WPluWfn+WQjTpcIiwgZG9tYWluKTtcbiAgICAgICAgR01feG1saHR0cFJlcXVlc3Qoe1xuICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICAgICAgdXJsOiBgaHR0cHM6Ly9hcGkuY2xvdWRmbGFyZS5jb20vY2xpZW50L3Y0L3pvbmVzP25hbWU9JHtkb21haW59YCxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7Y29uZmlnLmFwaVRva2VufWAsXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25sb2FkOiBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQVBJ5ZON5bqU54q25oCBOlwiLCByZXNwb25zZS5zdGF0dXMpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHJlc3BvbnNlLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlrozmlbRBUEnlk43lupQ6XCIsIGRhdGEpO1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLnJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEucmVzdWx0WzBdPy5pZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25lcnJvcjogZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi6I635Y+WWm9uZSBJROWksei0pTpcIiwgZXJyb3IpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuLy8g5riF6Zmk57yT5a2Y5Ye95pWwXG5hc3luYyBmdW5jdGlvbiBjbGVhckNhY2hlKHVybHMpIHtcbiAgICBjb25zb2xlLmxvZyhcIuW8gOWni+a4hemZpOe8k+WtmOa1geeoi1wiKTtcbiAgICBpZiAoIXVybHMubGVuZ3RoKSB7XG4gICAgICAgIGFsZXJ0KFwi6K+36YCJ5oup5oiW6ICF6L6T5YWl6ZyA6KaB5riF6Zmk55qE57yT5a2Y6aG577yBXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghdmFsaWRhdGVDb25maWcoKSkgcmV0dXJuO1xuICAgIGxldCBkb21haW4gPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKS5ob3N0bmFtZTtcbiAgICAvLyDljrvpmaRkb21haW7nmoR3d3fliY3nvIBcbiAgICBkb21haW4gPSBkb21haW4ucmVwbGFjZSgvXnd3d1xcLi8sIFwiXCIpO1xuICAgIGNvbnNvbGUubG9nKFwi6Kej5p6Q5Ye655qE5Z+f5ZCNOlwiLCBkb21haW4pO1xuICAgIGNvbnN0IHpvbmVJZCA9IGF3YWl0IGdldFpvbmVJZChkb21haW4pO1xuICAgIGlmICghem9uZUlkKSB7XG4gICAgICAgIGFsZXJ0KFwi5pyq5om+5Yiw6K+l5Z+f5ZCN5a+55bqU55qEQ2xvdWRmbGFyZSB6b25lLOivt+ajgOafpeWfn+WQjeaYr+WQpuato+ehru+8gVwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyDkvb/nlKjliqjmgIF6b25lSWTlj5HpgIHor7fmsYIuLi5cbiAgICBhd2FpdCBwdXJnZUNhY2hlKHpvbmVJZCwgdXJscyk7XG59XG5cbi8vIOa4hemZpOe8k+WtmOWwgeijhVxuZnVuY3Rpb24gcHVyZ2VDYWNoZSh6b25nZUlkLCB1cmxzKSB7XG4gICAgY29uc3QgYXBpVXJsID0gYGh0dHBzOi8vYXBpLmNsb3VkZmxhcmUuY29tL2NsaWVudC92NC96b25lcy8ke3pvbmdlSWR9L3B1cmdlX2NhY2hlYDtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgXCIlYyBbIOmcgOimgea4hemZpOeahHVybHMgXTogXCIsXG4gICAgICAgIFwiY29sb3I6ICNiZjJjOWY7IGJhY2tncm91bmQ6IHBpbms7IGZvbnQtc2l6ZTogMTNweDtcIixcbiAgICAgICAgdXJsc1xuICAgICk7XG4gICAgR01feG1saHR0cFJlcXVlc3Qoe1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICB1cmw6IGFwaVVybCxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke2NvbmZpZy5hcGlUb2tlbn1gLFxuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIGZpbGVzOiBbLi4udXJsc10sXG4gICAgICAgIH0pLFxuICAgICAgICBvbmxvYWQ6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBKU09OLnBhcnNlKHJlc3BvbnNlLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBhbGVydChcIue8k+WtmOa4heeQhuaIkOWKnyFcIik7XG4gICAgICAgICAgICAgICAgLy8g5Yi35paw5b2T5YmN6aG16Z2iXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydChcbiAgICAgICAgICAgICAgICAgICAgXCJBUEnor7fmsYLmuIXnkIbnvJPlrZjlpLHotKUob25sb2FkKTpcIiArXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQuZXJyb3JzID8uWzBdPy5tZXNzYWdlIHx8IFwiVW5rbm93biBlcnJvclwiKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9uZXJyb3I6IGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICBhbGVydChcIkFQSeivt+axgua4heeQhue8k+WtmOWksei0pShvbmVycm9yKTogXCIgKyBlcnJvci5yZXNwb25zZVRleHQpO1xuICAgICAgICB9LFxuICAgIH0pO1xufVxuXG4vLyDojrflj5blvZPliY3pk77mjqXor7fmsYLlk43lupTlpLRcbmNvbnN0IGdldENmUmVzcG9uc2VIZWFkZXJzID0gYXN5bmMgKHVybCkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICBHTV94bWxodHRwUmVxdWVzdCh7XG4gICAgICAgICAgICBtZXRob2Q6IFwiSEVBRFwiLFxuICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgb25sb2FkOiBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIC8vIOi/lOWbnuWTjeW6lOWktOS4reeahGNmLWNhY2hlLXN0YXR1c+Wtl+autVxuICAgICAgICAgICAgICAgIGNvbnN0IGNmQ2FjaGVTdGF0dXNNYXRjaCA9IHJlc3BvbnNlLnJlc3BvbnNlSGVhZGVycy5tYXRjaCgvY2YtY2FjaGUtc3RhdHVzOlxccyooLispL2kpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNmQ2FjaGVTdGF0dXNWYWx1ZSA9IGNmQ2FjaGVTdGF0dXNNYXRjaCA/IGNmQ2FjaGVTdGF0dXNNYXRjaFsxXSA6IG51bGw7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShjZkNhY2hlU3RhdHVzVmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uZXJyb3I6IGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuiOt+WPluWTjeW6lOWktOWksei0pTpcIiwgZXJyb3IpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5cbi8vIOiOt+WPlui1hOa6kOmTvuaOpVxuY29uc3QgZ2V0UmVzb3VyY2VzID0gKCkgPT4ge1xuICAgIGNvbnN0IGJsYWNrbGlzdGVkUGF0dGVybnMgPSBbXG4gICAgICAgIC9hbmFseXRpY3NcXC5leGFtcGxlXFwuY29tLyxcbiAgICAgICAgL3d3d1xcLmNsYXJpdHkvLFxuICAgICAgICAvd3d3XFwuZ29vZ2xlLyxcbiAgICAgICAgL2FwcFxcLnRlcm1seS8sXG4gICAgXTtcbiAgICBjb25zdCBqc0xpbmtzID0gQXJyYXkuZnJvbShkb2N1bWVudC5zY3JpcHRzKVxuICAgICAgICAubWFwKChzKSA9PiBzLnNyYylcbiAgICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgICAuZmlsdGVyKFxuICAgICAgICAgICAgKHVybCkgPT4gIWJsYWNrbGlzdGVkUGF0dGVybnMuc29tZSgocGF0dGVybikgPT4gcGF0dGVybi50ZXN0KHVybCkpXG4gICAgICAgICk7XG4gICAgY29uc3QgY3NzTGlua3MgPSBBcnJheS5mcm9tKFxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaW5rW3JlbD1cInN0eWxlc2hlZXRcIl0nKVxuICAgICkubWFwKChsaW5rKSA9PiBsaW5rLmhyZWYpO1xuICAgIGNvbnN0IGltZ0xpbmtzID0gQXJyYXkuZnJvbShkb2N1bWVudC5pbWFnZXMpXG4gICAgICAgIC5tYXAoKGltZykgPT4gaW1nLnNyYylcbiAgICAgICAgLmZpbHRlcihCb29sZWFuKTtcbiAgICBjb25zdCBjc3NCZ0ltYWdlcyA9IG5ldyBTZXQoKTtcbiAgICBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIqXCIpKS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICBjb25zdCBiZyA9IGdldENvbXB1dGVkU3R5bGUoZWwpLmJhY2tncm91bmRJbWFnZTtcbiAgICAgICAgY29uc3QgbSA9IGJnLm1hdGNoKC91cmxcXChbXCInXT8oLio/KVtcIiddP1xcKS8pO1xuICAgICAgICBpZiAobSAmJiBtWzFdKSBjc3NCZ0ltYWdlcy5hZGQobVsxXSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBhbGxJbWFnZXMgPSBBcnJheS5mcm9tKG5ldyBTZXQoWy4uLmltZ0xpbmtzLCAuLi5jc3NCZ0ltYWdlc10pKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBqczoganNMaW5rcyxcbiAgICAgICAgY3NzOiBjc3NMaW5rcyxcbiAgICAgICAgaW1nOiBhbGxJbWFnZXMsXG4gICAgfTtcbn07XG5cbi8vIOWbvueJh+eAkeW4g+a1geW4g+WxgFxuY29uc3QgbGF5b3V0TWFzb25yeSA9IChjb250YWluZXJTZWxlY3RvciwgY29sdW1uQ291bnQgPSA0LCBzcGFjaW5nID0gMTApID0+IHtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lclNlbGVjdG9yKTtcbiAgICBpZiAoIWNvbnRhaW5lcikgcmV0dXJuO1xuXG4gICAgY29uc3QgaXRlbXMgPSBBcnJheS5mcm9tKGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwibGFiZWxcIikpO1xuICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgIGNvbnN0IGl0ZW1XaWR0aCA9IDIwMCArIHNwYWNpbmcgKiAyOyAvLyDmr4/kuKrlm77niYfpobnnmoTlrr3luqbvvIjlkKvlt6blj7MgbWFyZ2lu77yJXG4gICAgbGV0IGNvbHVtbkhlaWdodHMgPSBBcnJheShjb2x1bW5Db3VudCkuZmlsbCgwKTsgLy8g5a2Y5YKo5q+P5LiA5YiX55qE6auY5bqmXG5cbiAgICBpdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIC8vIOaJvuWIsOW9k+WJjeacgOefreeahOS4gOWIl1xuICAgICAgICBjb25zdCBtaW5IZWlnaHQgPSBNYXRoLm1pbiguLi5jb2x1bW5IZWlnaHRzKTtcbiAgICAgICAgY29uc3QgY29sSW5kZXggPSBjb2x1bW5IZWlnaHRzLmluZGV4T2YobWluSGVpZ2h0KTtcblxuICAgICAgICAvLyDorr7nva7nu53lr7nlrprkvY3kvY3nva5cbiAgICAgICAgaXRlbS5zdHlsZS5sZWZ0ID0gYCR7Y29sSW5kZXggKiBpdGVtV2lkdGh9cHhgO1xuICAgICAgICBpdGVtLnN0eWxlLnRvcCA9IGAke21pbkhlaWdodH1weGA7XG5cbiAgICAgICAgLy8g5pu05paw6K+l5YiX55qE6auY5bqmXG4gICAgICAgIGNvbnN0IGl0ZW1IZWlnaHQgPSBpdGVtLm9mZnNldEhlaWdodDtcbiAgICAgICAgY29sdW1uSGVpZ2h0c1tjb2xJbmRleF0gKz0gaXRlbUhlaWdodDtcbiAgICB9KTtcbn07XG5cbi8vIOWIm+W7uui1hOa6kOWIl+ihqOmdouadvztcbmNvbnN0IGNyZWF0ZVJlc291cmNlUGFuZWwgPSAocGljQXJyYXksIHR5cGUpID0+IHtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKHN0eWxlLnBhbmVsKTtcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiJHtzdHlsZS5oZWFkfVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0aXRsZVwiPui1hOa6kOWIl+ihqDwvc3Bhbj5cbiAgICAgICAgICAgIDxzdmcgZGF0YS1pZD1cInBhbmVsLWNsb3NlXCIgY2xhc3M9XCIke1xuICAgICAgICAgICAgICAgIHN0eWxlLmNsb3NlXG4gICAgICAgICAgICB9XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNDggNDhcIj5cbiAgICAgICAgICAgICAgICA8cG9seWdvblxuICAgICAgICAgICAgICAgICAgICBkYXRhLWlkPVwicGFuZWwtY2xvc2VcIlxuICAgICAgICAgICAgICAgICAgICBwb2ludHM9XCIzNS4zMSA5Ljg2IDI0IDIxLjE3IDEyLjY5IDkuODYgOS44NiAxMi42OSAyMS4xNyAyNCA5Ljg2IDM1LjMxIDEyLjY5IDM4LjE0IDI0IDI2LjgzIDM1LjMxIDM4LjE0IDM4LjE0IDM1LjMxIDI2LjgzIDI0IDM4LjE0IDEyLjY5IDM1LjMxIDkuODZcIiAvPlxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGlkPVwiJHt0eXBlID09PSBcImltZ1wiID8gXCJ4LXBhbmVsLXdhbGxcIiA6IFwiXCJ9XCIgXG4gICAgICAgIGNsYXNzPVwiJHt0eXBlID09PSBcImltZ1wiID8gc3R5bGUud2FsbCA6IHN0eWxlLmxpc3R9XCI+XG4gICAgICAgICAgICAke3BpY0FycmF5XG4gICAgICAgICAgICAgICAgLm1hcChcbiAgICAgICAgICAgICAgICAgICAgKHVybCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cIiR7c3R5bGUuaXRlbX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgdmFsdWU9XCIke3VybH1cIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9PT0gXCJpbWdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBgPGltZyBzcmM9XCIke3VybH1cIiAvPmBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYDxzcGFuPiR7dXJsfTwvc3Bhbj5gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAuam9pbihcIlxcblwiKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCIke3N0eWxlLmZvb3R9XCI+XG4gICAgICAgICAgICA8YnV0dG9uICBkYXRhLWlkPVwicGFuZWwtY2xvc2VcIj7lj5bmtog8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gZGF0YS1pZD1cInBhbmVsLXN1Ym1pdFwiIGRhdGEtdHlwZT1cIiR7dHlwZX1cIj7muIXpmaQ8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgXG5gO1xuICAgIHJldHVybiBjb250YWluZXI7XG59O1xuXG4vLyDliJvlu7rovpPlhaXmoYbpnaLmnb87XG5jb25zdCBjcmVhdGVJbnB1dFBhbmVsID0gKHR5cGUpID0+IHtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKHN0eWxlLnBhbmVsKTtcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiJHtzdHlsZS5oZWFkfVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0aXRsZVwiPua4hemZpOWkmuS4qnVybOmTvuaOpTwvc3Bhbj5cbiAgICAgICAgICAgIDxzdmcgZGF0YS1pZD1cInBhbmVsLWNsb3NlXCIgY2xhc3M9XCIke3N0eWxlLmNsb3NlfVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDQ4IDQ4XCI+XG4gICAgICAgICAgICAgICAgPHBvbHlnb25cbiAgICAgICAgICAgICAgICAgICAgZGF0YS1pZD1cInBhbmVsLWNsb3NlXCJcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRzPVwiMzUuMzEgOS44NiAyNCAyMS4xNyAxMi42OSA5Ljg2IDkuODYgMTIuNjkgMjEuMTcgMjQgOS44NiAzNS4zMSAxMi42OSAzOC4xNCAyNCAyNi44MyAzNS4zMSAzOC4xNCAzOC4xNCAzNS4zMSAyNi44MyAyNCAzOC4xNCAxMi42OSAzNS4zMSA5Ljg2XCIgLz5cbiAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBcbiAgICAgICAgY2xhc3M9XCIke3N0eWxlLmlucHV0YXJlYX1cIj5cbiAgICAgICAgICAgIDx0ZXh0YXJlYSBjb2xzPVwiODBcIiByb3dzPVwiNlwiIG5hbWU9XCJpbnB1dGFyZWFcIiBwbGFjZWhvbGRlcj1cIui+k+WFpXVybOmTvuaOpSzlpJrkuKrpk77mjqXpnIDopoHlj6blj5bkuIDooYxcIj48L3RleHRhcmVhPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIiR7c3R5bGUuZm9vdH1cIj5cbiAgICAgICAgICAgIDxidXR0b24gIGRhdGEtaWQ9XCJwYW5lbC1jbG9zZVwiPuWPlua2iDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLWlkPVwicGFuZWwtc3VibWl0XCIgZGF0YS10eXBlPVwiJHt0eXBlfVwiPua4hemZpDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICBcbmA7XG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcbn07XG5cbi8vIOWIm+W7uuS+p+i+ueiPnOWNlVxuY29uc3QgY3JlYXRlTWVudSA9ICgpID0+IHtcbiAgICBjb25zdCBtZW51RWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBtZW51RWxlLmNsYXNzTGlzdC5hZGQoc3R5bGUubWVudSk7XG4gICAgY29uc3QgZW50cnlFbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpOyAvLyDlhaXlj6PmjInpkq5cbiAgICBlbnRyeUVsZS5jbGFzc0xpc3QuYWRkKHN0eWxlLmVudHJ5KTtcbiAgICBlbnRyeUVsZS5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8c3ZnIGNsYXNzPVwiJHtzdHlsZS5pY29ufVwiIHdpZHRoPVwiMzZcIiBoZWlnaHQ9XCIzNlwiIHZpZXdCb3g9XCIwIDAgMTAyNCAxMDI0XCIgdmVyc2lvbj1cIjEuMVwiXG4gICAgICAgICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCIjOEQ5MjlDXCJcbiAgICAgICAgICAgICAgICAgICAgZD1cIk04OTYgNTEyQTM4NCAzODQgMCAwIDAgNTMzLjMzMzMzMyAxMjkuMDY2NjY3aC0yMS4zMzMzMzNBMzg0IDM4NCAwIDAgMCAxMjkuMDY2NjY3IDQ5MC42NjY2Njd2MjEuMzMzMzMzQTM4NCAzODQgMCAwIDAgNDkwLjY2NjY2NyA4OTZoMjEuMzMzMzMzYTM4NCAzODQgMCAwIDAgMzg0LTM2Mi42NjY2Njd2LTIxLjMzMzMzM3ogbS04NS4zMzMzMzMgMHYxMy4wMTMzMzNhMTI4IDEyOCAwIDAgMS0yNDkuODEzMzM0IDIzLjg5MzMzNEEyMTMuMzMzMzMzIDIxMy4zMzMzMzMgMCAwIDAgNzIxLjA2NjY2NyAyOTguNjY2NjY3IDI5OC42NjY2NjcgMjk4LjY2NjY2NyAwIDAgMSA4MTAuNjY2NjY3IDUxMnpNNTEyIDIxMy4zMzMzMzNoMTMuMDEzMzMzYTEyOCAxMjggMCAwIDEgMjMuODkzMzM0IDI0OS44MTMzMzRBMjEzLjMzMzMzMyAyMTMuMzMzMzMzIDAgMCAwIDI5OC42NjY2NjcgMzAyLjkzMzMzMyAyOTguNjY2NjY3IDI5OC42NjY2NjcgMCAwIDEgNTEyIDIxMy4zMzMzMzN6TTIxMy4zMzMzMzMgNTEydi0xMy4wMTMzMzNhMTI4IDEyOCAwIDAgMSAyNDkuODEzMzM0LTIzLjg5MzMzNEEyMTMuMzMzMzMzIDIxMy4zMzMzMzMgMCAwIDAgMzAyLjkzMzMzMyA3MjUuMzMzMzMzIDI5OC42NjY2NjcgMjk4LjY2NjY2NyAwIDAgMSAyMTMuMzMzMzMzIDUxMnogbTI5OC42NjY2NjcgMjk4LjY2NjY2N2gtMTMuMDEzMzMzYTEyOCAxMjggMCAwIDEtMjMuODkzMzM0LTI0OS44MTMzMzRBMjEzLjMzMzMzMyAyMTMuMzMzMzMzIDAgMCAwIDcyNS4zMzMzMzMgNzIxLjA2NjY2NyAyOTguNjY2NjY3IDI5OC42NjY2NjcgMCAwIDEgNTEyIDgxMC42NjY2Njd6XCIgLz5cbiAgICAgICAgICAgIDwvc3ZnPmA7XG4gICAgY29uc3QgbWVudVVsRWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpOyAvLyDlhaXlj6Poj5zljZXliJfooahcbiAgICBtZW51VWxFbGUuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCIke3N0eWxlLml0ZW19XCIgZGF0YS1pZD1cImltZ3NcIj5cbiAgICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzcz1cIiR7c3R5bGUuaWNvbn1cIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDEwMjQgMTAyNFwiIHZlcnNpb249XCIxLjFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbD1cIiM4RDkyOUNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ9XCJNODUzLjMzMzMzMyA2ODIuNjY2NjY3di00Mi42NjY2NjdhNDIuNjY2NjY3IDQyLjY2NjY2NyAwIDAgMC04NS4zMzMzMzMgMHYxNzAuNjY2NjY3YTQyLjY2NjY2NyA0Mi42NjY2NjcgMCAwIDAgODUuMzMzMzMzIDBoLTQyLjY2NjY2NnYtODUuMzMzMzM0aDEyOHY4NS4zMzMzMzRhMTI4IDEyOCAwIDAgMS0yNTYgMHYtMTcwLjY2NjY2N2ExMjggMTI4IDAgMCAxIDI1NiAwdjQyLjY2NjY2N3ogbS01MTItODUuMzMzMzM0di04NS4zMzMzMzNIODUuMzMzMzMzdjg1LjMzMzMzM2g4NS4zMzMzMzR2MjU2SDg1LjMzMzMzM3Y4NS4zMzMzMzRoMjU2di04NS4zMzMzMzRoLTg1LjMzMzMzM1Y1OTcuMzMzMzMzeiBtMjk4LjY2NjY2Ny04NS4zMzMzMzN2NDI2LjY2NjY2N2gtODUuMzMzMzMzVjY1NC4yOTMzMzNsLTQyLjY2NjY2NyA1Ni43NDY2NjctNDIuNjY2NjY3LTU2Ljc0NjY2N1Y5MzguNjY2NjY3aC04NS4zMzMzMzNWNTEyaDg1LjMzMzMzM2w0Mi42NjY2NjcgNTYuOTZMNTU0LjY2NjY2NyA1MTJ6IG04NS4zMzMzMzMtNDI2LjY2NjY2N2wyMTMuMzMzMzM0IDIxMy4zMzMzMzR2MTcwLjY2NjY2NmgtODUuMzMzMzM0di0xMzUuMjUzMzMzTDY4OS45MiAxNzAuNjY2NjY3SDE3MC42NjY2Njd2Mjk4LjY2NjY2Nkg4NS4zMzMzMzNWODUuMzMzMzMzelwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgICDlm77niYfmlofku7ZcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7c3R5bGUuaXRlbX1cIiBkYXRhLWlkPVwiY3NzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3M9XCIke3N0eWxlLmljb259XCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAxMDI0IDEwMjRcIiB2ZXJzaW9uPVwiMS4xXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCIjOEQ5MjlDXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkPVwiTTcyNS4zMzMzMzMgODUuMzMzMzMzbDIxMy4zMzMzMzQgMjEzLjMzMzMzNHYxNzAuNjY2NjY2aC04NS4zMzMzMzR2LTEzNS4yNTMzMzNMNjg5LjkyIDE3MC42NjY2NjdIMTcwLjY2NjY2N3YyOTguNjY2NjY2SDg1LjMzMzMzM1Y4NS4zMzMzMzN6TTI1NiA3Njh2NDIuNjY2NjY3YTQyLjY2NjY2NyA0Mi42NjY2NjcgMCAwIDEtODUuMzMzMzMzIDB2LTE3MC42NjY2NjdhNDIuNjY2NjY3IDQyLjY2NjY2NyAwIDAgMSA4NS4zMzMzMzMgMHY0Mi42NjY2NjdoODUuMzMzMzMzdi00Mi42NjY2NjdhMTI4IDEyOCAwIDAgMC0yNTYgMHYxNzAuNjY2NjY3YTEyOCAxMjggMCAwIDAgMjU2IDB2LTQyLjY2NjY2N3ogbTI1Ni04NS4zMzMzMzNhNDIuNjY2NjY3IDQyLjY2NjY2NyAwIDEgMSA0Mi42NjY2NjctNDIuNjY2NjY3aDg1LjMzMzMzM2ExMjggMTI4IDAgMSAwLTEyOCAxMjggNDIuNjY2NjY3IDQyLjY2NjY2NyAwIDEgMS00Mi42NjY2NjcgNDIuNjY2NjY3aC04NS4zMzMzMzNhMTI4IDEyOCAwIDEgMCAxMjgtMTI4eiBtMjk4LjY2NjY2NyAwYTQyLjY2NjY2NyA0Mi42NjY2NjcgMCAxIDEgNDIuNjY2NjY2LTQyLjY2NjY2N2g4NS4zMzMzMzRhMTI4IDEyOCAwIDEgMC0xMjggMTI4IDQyLjY2NjY2NyA0Mi42NjY2NjcgMCAxIDEtNDIuNjY2NjY3IDQyLjY2NjY2N2gtODUuMzMzMzMzYTEyOCAxMjggMCAxIDAgMTI4LTEyOHpcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICAgICAgQ1NT5paH5Lu2XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCIke3N0eWxlLml0ZW19XCIgZGF0YS1pZD1cImpzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3M9XCIke3N0eWxlLmljb259XCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAxMDI0IDEwMjRcIiB2ZXJzaW9uPVwiMS4xXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCIjOEQ5MjlDXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkPVwiTTkzOC42NjY2NjcgMjk4LjY2NjY2N3Y2NDBINjgyLjY2NjY2N3YtODUuMzMzMzM0aDE3MC42NjY2NjZWMzM0LjA4TDY4OS45MiAxNzAuNjY2NjY3SDE3MC42NjY2Njd2Mjk4LjY2NjY2Nkg4NS4zMzMzMzNWODUuMzMzMzMzaDY0MHpNNTEyIDY4Mi42NjY2NjdhNDIuNjY2NjY3IDQyLjY2NjY2NyAwIDEgMSA0Mi42NjY2NjctNDIuNjY2NjY3aDg1LjMzMzMzM2ExMjggMTI4IDAgMSAwLTEyOCAxMjggNDIuNjY2NjY3IDQyLjY2NjY2NyAwIDEgMS00Mi42NjY2NjcgNDIuNjY2NjY3aC04NS4zMzMzMzNhMTI4IDEyOCAwIDEgMCAxMjgtMTI4eiBtLTI1Ni0xNzAuNjY2NjY3djI5OC42NjY2NjdhNDIuNjY2NjY3IDQyLjY2NjY2NyAwIDAgMS04NS4zMzMzMzMgMHYtNDIuNjY2NjY3SDg1LjMzMzMzM3Y0Mi42NjY2NjdhMTI4IDEyOCAwIDAgMCAyNTYgMFY1MTJ6XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgICAgICAgIEpT5paH5Lu2XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCIke3N0eWxlLml0ZW19XCIgZGF0YS1pZD1cImxpbmtcIj5cbiAgICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzcz1cIiR7c3R5bGUuaWNvbn1cIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA0OCA0OFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbD1cIiM4RDkyOUNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ9XCJNMTgsNDRWMzBhNiw2LDAsMCwxLDEyLDBWNDRIMjZWMzBhMiwyLDAsMCwwLTQsMFY0NFpNMTYsMjhWMjRINHY0SDhWNDBINHY0SDE2VjQwSDEyVjI4Wk0zNCw0SDRWMjJIOFY4SDMyLjM0TDQwLDE1LjY2VjIyaDRWMTRaTTMyLDI0VjQ0aDRWMjRabTEyLDBINDBMMzYsMzRsNCwxMGg0TDQwLDM0WlwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgICDlvZPliY3pk77mjqVcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7c3R5bGUuaXRlbX1cIiBkYXRhLWlkPVwidXJsc1wiPlxuICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzPVwiJHtzdHlsZS5pY29ufVwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDQ4IDQ4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPVwiIzhEOTI5Q1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZD1cIk00NCw0MHY0SDMyVjI0aDRWNDBaTTQwLDE1LjY2VjIyaDRWMTRMMzQsNEg0VjIySDhWOEgzMi4zNFpNMjguMDgsMzQuMzksMzAsNDRIMjZsLTEuNi04TDI0LDM2SDIydjhIMThWMjRoNmE2LDYsMCwwLDEsNC4wOCwxMC4zOVpNMjQsMzJhMiwyLDAsMCwwLDAtNEgyMnY0Wk0xMiwyNFYzOGEyLDIsMCwwLDEtNCwwVjI0SDRWMzhhNiw2LDAsMCwwLDEyLDBWMjRaXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgICAgICAgIOWkmuS4qumTvuaOpVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9saT5cblxuICAgIGA7XG5cbiAgICBtZW51RWxlLmFwcGVuZENoaWxkKGVudHJ5RWxlKTtcbiAgICBtZW51RWxlLmFwcGVuZENoaWxkKG1lbnVVbEVsZSk7XG4gICAgcmV0dXJuIG1lbnVFbGU7XG59O1xuXG5pZiAod2luZG93LnNlbGYgPT09IHdpbmRvdy50b3ApIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IHh0b29sc0VsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNvbnN0IG1lbnVFbGUgPSBjcmVhdGVNZW51KCk7XG4gICAgICAgIGNvbnN0IHJlc291cmNlcyA9IGdldFJlc291cmNlcygpO1xuICAgICAgICBjb25zdCBwaWNQYW5lbEVsZSA9IGNyZWF0ZVJlc291cmNlUGFuZWwocmVzb3VyY2VzLmltZywgXCJpbWdcIik7XG4gICAgICAgIGNvbnN0IGNzc1BhbmVsRWxlID0gY3JlYXRlUmVzb3VyY2VQYW5lbChyZXNvdXJjZXMuY3NzLCBcImNzc1wiKTtcbiAgICAgICAgY29uc3QganNQYW5lbEVsZSA9IGNyZWF0ZVJlc291cmNlUGFuZWwocmVzb3VyY2VzLmpzLCBcImpzXCIpO1xuICAgICAgICBjb25zdCBpbnB1dFBhbmVsRWxlID0gY3JlYXRlSW5wdXRQYW5lbChcInVybHNcIik7XG5cbiAgICAgICAgLy8g6YGN5Y6GY2hpbGROb2Rlc++8jOenu+mZpHNob3fmoLflvI9cbiAgICAgICAgY29uc3QgY2xvc2VQYW5lbCA9IChub2RlcykgPT4ge1xuICAgICAgICAgICAgbm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIG5vZGUuY2xhc3NMaXN0LnJlbW92ZShzdHlsZS5zaG93KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIOWvueiPnOWNlemhueeahOeCueWHu+S6i+S7tui/m+ihjOebkeWQrFxuICAgICAgICB4dG9vbHNFbGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBzd2l0Y2ggKGUudGFyZ2V0LmRhdGFzZXQuaWQpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwiaW1nc1wiOlxuICAgICAgICAgICAgICAgICAgICAvLyDpgInmi6nlm77niYdcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VQYW5lbCh0aGlzLmNoaWxkTm9kZXMpO1xuICAgICAgICAgICAgICAgICAgICBwaWNQYW5lbEVsZS5jbGFzc0xpc3QuYWRkKHN0eWxlLnNob3cpO1xuICAgICAgICAgICAgICAgICAgICBsYXlvdXRNYXNvbnJ5KFwiI3gtcGFuZWwtd2FsbFwiLCA0KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImNzc1wiOlxuICAgICAgICAgICAgICAgICAgICAvLyDpgInmi6ljc3NcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VQYW5lbCh0aGlzLmNoaWxkTm9kZXMpO1xuICAgICAgICAgICAgICAgICAgICBjc3NQYW5lbEVsZS5jbGFzc0xpc3QuYWRkKHN0eWxlLnNob3cpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwianNcIjpcbiAgICAgICAgICAgICAgICAgICAgLy8g6YCJ5oupanNcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VQYW5lbCh0aGlzLmNoaWxkTm9kZXMpO1xuICAgICAgICAgICAgICAgICAgICBqc1BhbmVsRWxlLmNsYXNzTGlzdC5hZGQoc3R5bGUuc2hvdyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJsaW5rXCI6XG4gICAgICAgICAgICAgICAgICAgIC8vIOa4hemZpOW9k+WJjWxpbmtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJDYWNoZShbd2luZG93LmxvY2F0aW9uLmhyZWZdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInVybHNcIjpcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VQYW5lbCh0aGlzLmNoaWxkTm9kZXMpO1xuICAgICAgICAgICAgICAgICAgICAvLyDovpPlhaV1cmxzXG4gICAgICAgICAgICAgICAgICAgIGlucHV0UGFuZWxFbGUuY2xhc3NMaXN0LmFkZChzdHlsZS5zaG93KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIFwicGFuZWwtc3VibWl0XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgLy8g6I635Y+WaW5wdXRQYW5lbEVsZeS4rXRleHRhcmVh55qEdmFsdWUg5Lul5Zue6L2m5YiG5Ymy5oiQ5pWw57uEIC8vIOWmguaenHRleHRhcmVhIOS4uuepuiDliJnov5Tlm57nqbrmlbDnu4RcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5wdXRVcmxzID0gaW5wdXRQYW5lbEVsZVxuICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCJ0ZXh0YXJlYVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnZhbHVlLnNwbGl0KFwiXFxuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKEJvb2xlYW4pO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4ueHRvb2xzRWxlLnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnB1dFt0eXBlPSdjaGVja2JveCddOmNoZWNrZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgXS5tYXAoKGMpID0+IGMudmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyQ2FjaGUoWy4uLmlucHV0VXJscywgLi4uc2VsZWN0ZWRdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwicGFuZWwtY2xvc2VcIjpcbiAgICAgICAgICAgICAgICAvLyDpgY3ljoZjaGlsZE5vZGVz77yM56e76Zmkc2hvd+agt+W8j1xuICAgICAgICAgICAgICAgIGNsb3NlUGFuZWwodGhpcy5jaGlsZE5vZGVzKTtcbiAgICAgICAgICAgICAgICAvLyDpgY3ljobmiYDmnInnmoRjaGVja2JveCzlj5bmtojpgInkuK1cbiAgICAgICAgICAgICAgICB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFt0eXBlPWNoZWNrYm94XVwiKS5mb3JFYWNoKFxuICAgICAgICAgICAgICAgICAgICAoY2hlY2tib3gpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgLy8g5riF56m6dGV4dGFyZWHnmoTlgLxcbiAgICAgICAgICAgICAgICB0aGlzLnF1ZXJ5U2VsZWN0b3IoXCJ0ZXh0YXJlYVwiKS52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB4dG9vbHNFbGUuYXBwZW5kQ2hpbGQobWVudUVsZSk7XG4gICAgICAgIHh0b29sc0VsZS5hcHBlbmRDaGlsZChwaWNQYW5lbEVsZSk7XG4gICAgICAgIHh0b29sc0VsZS5hcHBlbmRDaGlsZChjc3NQYW5lbEVsZSk7XG4gICAgICAgIHh0b29sc0VsZS5hcHBlbmRDaGlsZChqc1BhbmVsRWxlKTtcbiAgICAgICAgeHRvb2xzRWxlLmFwcGVuZENoaWxkKGlucHV0UGFuZWxFbGUpO1xuXG4gICAgICAgIGdldENmUmVzcG9uc2VIZWFkZXJzKHdpbmRvdy5sb2NhdGlvbi5ocmVmKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbIHJlcyBdID4nLCByZXMpXG4gICAgICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh4dG9vbHNFbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn0iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFBQSxTQUFTLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFO0VBQy9CLEVBQUUsS0FBSyxHQUFHLEtBQUssS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQztFQUNqQyxFQUFFLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUM7QUFDOUI7RUFDQSxFQUFFLElBQUksQ0FBQyxHQUFHLElBQUksT0FBTyxRQUFRLEtBQUssV0FBVyxFQUFFLEVBQUUsT0FBTyxFQUFFO0FBQzFEO0VBQ0EsRUFBRSxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN2RSxFQUFFLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7RUFDOUMsRUFBRSxLQUFLLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztBQUMxQjtFQUNBLEVBQUUsSUFBSSxRQUFRLEtBQUssS0FBSyxFQUFFO0VBQzFCLElBQUksSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO0VBQ3pCLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0VBQ2hELEtBQUssTUFBTTtFQUNYLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUM5QixLQUFLO0VBQ0wsR0FBRyxNQUFNO0VBQ1QsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBQzVCLEdBQUc7QUFDSDtFQUNBLEVBQUUsSUFBSSxLQUFLLENB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
