
// ==UserScript==
// @name           Cloudflare 缓存清除工具 Dev
// @namespace      https://github.com/JsBeta/cloudflare-cache-purge/
// @version        1.8.0
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
          console.log("正在获取域名:", domain);
          GM_xmlhttpRequest({
              method: "GET",
              url: `https://api.cloudflare.com/client/v4/zones?name=${domain}`,
              headers: {
                  Authorization: `Bearer ${config.apiToken}`,
                  "Content-Type": "application/json",
              },
              onload: function (response) {
                  console.log("API响应状态:", response.status);
                  const data = JSON.parse(response.responseText);
                  console.log("完整API响应:", data);
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
                  const cfCacheStatusMatch = response.responseHeaders.match(/cf-cache-status:\s*(.+)/i);
                  const cfCacheStatusValue = cfCacheStatusMatch ? cfCacheStatusMatch[1] : null;
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
      getCfResponseHeaders(window.location.href).then((res) => {
          if (res) {
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
                  document.body.appendChild(xtoolsEle);
              });
          }
      });
  }

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5kZXYudXNlci5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWluamVjdC9kaXN0L3N0eWxlLWluamVjdC5lcy5qcyIsIi4uL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHN0eWxlSW5qZWN0KGNzcywgcmVmKSB7XG4gIGlmICggcmVmID09PSB2b2lkIDAgKSByZWYgPSB7fTtcbiAgdmFyIGluc2VydEF0ID0gcmVmLmluc2VydEF0O1xuXG4gIGlmICghY3NzIHx8IHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuOyB9XG5cbiAgdmFyIGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gIHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gIHN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xuXG4gIGlmIChpbnNlcnRBdCA9PT0gJ3RvcCcpIHtcbiAgICBpZiAoaGVhZC5maXJzdENoaWxkKSB7XG4gICAgICBoZWFkLmluc2VydEJlZm9yZShzdHlsZSwgaGVhZC5maXJzdENoaWxkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICB9XG5cbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgc3R5bGVJbmplY3Q7XG4iLCJpbXBvcnQgc3R5bGUgZnJvbSBcIi4vc3R5bGVzL21haW4ubGVzc1wiO1xuXG4vLyDphY3nva7kv6Hmga9cbmxldCBjb25maWcgPSB7XG4gICAgYXBpVG9rZW46IEdNX2dldFZhbHVlKFwiY2ZBcGlUb2tlblwiLCBcIlwiKSxcbn07XG5cbi8vIOa3u+WKoOmFjee9ruiPnOWNlVxuR01fcmVnaXN0ZXJNZW51Q29tbWFuZChcIumFjee9riBBUEkgVG9rZW5cIiwgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGFwaVRva2VuID0gcHJvbXB0KFxuICAgICAgICBcIuivt+i+k+WFpeaCqOeahCBDbG91ZGZsYXJlIEFQSSBUb2tlbjpcIixcbiAgICAgICAgY29uZmlnLmFwaVRva2VuXG4gICAgKTtcbiAgICBpZiAoYXBpVG9rZW4gIT09IG51bGwpIHtcbiAgICAgICAgR01fc2V0VmFsdWUoXCJjZkFwaVRva2VuXCIsIGFwaVRva2VuKTtcbiAgICAgICAgY29uZmlnLmFwaVRva2VuID0gYXBpVG9rZW47XG4gICAgfVxufSk7XG5cbi8vIOa3u+WKoOa4hemZpOe8k+WtmOiPnOWNleWSjOmhtemdouaMiemSrlxuR01fcmVnaXN0ZXJNZW51Q29tbWFuZChcIua4hemZpOW9k+WJjeWcsOWdgOe8k+WtmFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgY2xlYXJDYWNoZShbd2luZG93LmxvY2F0aW9uLmhyZWZdKTtcbn0pO1xuLy8g5L+u5pS56aqM6K+B6YWN572uXG5mdW5jdGlvbiB2YWxpZGF0ZUNvbmZpZygpIHtcbiAgICBpZiAoIWNvbmZpZy5hcGlUb2tlbikge1xuICAgICAgICBhbGVydChcIuivt+WFiOmFjee9rkNsb3VkZmxhcmUgQVBJIFRva2VuLlwiKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuLy8g5p+l5om+em9uZWlkXG5hc3luYyBmdW5jdGlvbiBnZXRab25lSWQoZG9tYWluKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi5q2j5Zyo6I635Y+W5Z+f5ZCNOlwiLCBkb21haW4pO1xuICAgICAgICBHTV94bWxodHRwUmVxdWVzdCh7XG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgICAgICB1cmw6IGBodHRwczovL2FwaS5jbG91ZGZsYXJlLmNvbS9jbGllbnQvdjQvem9uZXM/bmFtZT0ke2RvbWFpbn1gLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHtjb25maWcuYXBpVG9rZW59YCxcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbmxvYWQ6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQVBJ5ZON5bqU54q25oCBOlwiLCByZXNwb25zZS5zdGF0dXMpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHJlc3BvbnNlLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlrozmlbRBUEnlk43lupQ6XCIsIGRhdGEpO1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLnJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEucmVzdWx0WzBdPy5pZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25lcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuiOt+WPllpvbmUgSUTlpLHotKU6XCIsIGVycm9yKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbi8vIOa4hemZpOe8k+WtmOWHveaVsFxuYXN5bmMgZnVuY3Rpb24gY2xlYXJDYWNoZSh1cmxzKSB7XG4gICAgY29uc29sZS5sb2coXCLlvIDlp4vmuIXpmaTnvJPlrZjmtYHnqItcIik7XG4gICAgaWYgKCF1cmxzLmxlbmd0aCkge1xuICAgICAgICBhbGVydChcIuivt+mAieaLqeaIluiAhei+k+WFpemcgOimgea4hemZpOeahOe8k+WtmOmhue+8gVwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXZhbGlkYXRlQ29uZmlnKCkpIHJldHVybjtcbiAgICBsZXQgZG9tYWluID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZikuaG9zdG5hbWU7XG4gICAgLy8g5Y676ZmkZG9tYWlu55qEd3d35YmN57yAXG4gICAgZG9tYWluID0gZG9tYWluLnJlcGxhY2UoL153d3dcXC4vLCBcIlwiKTtcbiAgICBjb25zb2xlLmxvZyhcIuino+aekOWHuueahOWfn+WQjTpcIiwgZG9tYWluKTtcbiAgICBjb25zdCB6b25lSWQgPSBhd2FpdCBnZXRab25lSWQoZG9tYWluKTtcbiAgICBpZiAoIXpvbmVJZCkge1xuICAgICAgICBhbGVydChcIuacquaJvuWIsOivpeWfn+WQjeWvueW6lOeahENsb3VkZmxhcmUgem9uZSzor7fmo4Dmn6Xln5/lkI3mmK/lkKbmraPnoa7vvIFcIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8g5L2/55So5Yqo5oCBem9uZUlk5Y+R6YCB6K+35rGCLi4uXG4gICAgYXdhaXQgcHVyZ2VDYWNoZSh6b25lSWQsIHVybHMpO1xufVxuXG4vLyDmuIXpmaTnvJPlrZjlsIHoo4VcbmZ1bmN0aW9uIHB1cmdlQ2FjaGUoem9uZ2VJZCwgdXJscykge1xuICAgIGNvbnN0IGFwaVVybCA9IGBodHRwczovL2FwaS5jbG91ZGZsYXJlLmNvbS9jbGllbnQvdjQvem9uZXMvJHt6b25nZUlkfS9wdXJnZV9jYWNoZWA7XG4gICAgY29uc29sZS5sb2coXG4gICAgICAgIFwiJWMgWyDpnIDopoHmuIXpmaTnmoR1cmxzIF06IFwiLFxuICAgICAgICBcImNvbG9yOiAjYmYyYzlmOyBiYWNrZ3JvdW5kOiBwaW5rOyBmb250LXNpemU6IDEzcHg7XCIsXG4gICAgICAgIHVybHNcbiAgICApO1xuICAgIEdNX3htbGh0dHBSZXF1ZXN0KHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgdXJsOiBhcGlVcmwsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHtjb25maWcuYXBpVG9rZW59YCxcbiAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICB9LFxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBmaWxlczogWy4uLnVybHNdLFxuICAgICAgICB9KSxcbiAgICAgICAgb25sb2FkOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IEpTT04ucGFyc2UocmVzcG9uc2UucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwi57yT5a2Y5riF55CG5oiQ5YqfIVwiKTtcbiAgICAgICAgICAgICAgICAvLyDliLfmlrDlvZPliY3pobXpnaJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFsZXJ0KFxuICAgICAgICAgICAgICAgICAgICBcIkFQSeivt+axgua4heeQhue8k+WtmOWksei0pShvbmxvYWQpOlwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIChyZXN1bHQuZXJyb3JzPy5bMF0/Lm1lc3NhZ2UgfHwgXCJVbmtub3duIGVycm9yXCIpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb25lcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBhbGVydChcIkFQSeivt+axgua4heeQhue8k+WtmOWksei0pShvbmVycm9yKTogXCIgKyBlcnJvci5yZXNwb25zZVRleHQpO1xuICAgICAgICB9LFxuICAgIH0pO1xufVxuXG4vLyDojrflj5blvZPliY3pk77mjqXor7fmsYLlk43lupTlpLRcbmNvbnN0IGdldENmUmVzcG9uc2VIZWFkZXJzID0gYXN5bmMgKHVybCkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICBHTV94bWxodHRwUmVxdWVzdCh7XG4gICAgICAgICAgICBtZXRob2Q6IFwiSEVBRFwiLFxuICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgb25sb2FkOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAvLyDov5Tlm57lk43lupTlpLTkuK3nmoRjZi1jYWNoZS1zdGF0dXPlrZfmrrVcbiAgICAgICAgICAgICAgICBjb25zdCBjZkNhY2hlU3RhdHVzTWF0Y2ggPSByZXNwb25zZS5yZXNwb25zZUhlYWRlcnMubWF0Y2goL2NmLWNhY2hlLXN0YXR1czpcXHMqKC4rKS9pKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjZkNhY2hlU3RhdHVzVmFsdWUgPSBjZkNhY2hlU3RhdHVzTWF0Y2ggPyBjZkNhY2hlU3RhdHVzTWF0Y2hbMV0gOiBudWxsO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoY2ZDYWNoZVN0YXR1c1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbmVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi6I635Y+W5ZON5bqU5aS05aSx6LSlOlwiLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcblxuLy8g6I635Y+W6LWE5rqQ6ZO+5o6lXG5jb25zdCBnZXRSZXNvdXJjZXMgPSAoKSA9PiB7XG4gICAgY29uc3QgYmxhY2tsaXN0ZWRQYXR0ZXJucyA9IFtcbiAgICAgICAgL2FuYWx5dGljc1xcLmV4YW1wbGVcXC5jb20vLFxuICAgICAgICAvd3d3XFwuY2xhcml0eS8sXG4gICAgICAgIC93d3dcXC5nb29nbGUvLFxuICAgICAgICAvYXBwXFwudGVybWx5LyxcbiAgICBdO1xuICAgIGNvbnN0IGpzTGlua3MgPSBBcnJheS5mcm9tKGRvY3VtZW50LnNjcmlwdHMpXG4gICAgICAgIC5tYXAoKHMpID0+IHMuc3JjKVxuICAgICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAgIC5maWx0ZXIoXG4gICAgICAgICAgICAodXJsKSA9PiAhYmxhY2tsaXN0ZWRQYXR0ZXJucy5zb21lKChwYXR0ZXJuKSA9PiBwYXR0ZXJuLnRlc3QodXJsKSlcbiAgICAgICAgKTtcbiAgICBjb25zdCBjc3NMaW5rcyA9IEFycmF5LmZyb20oXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpbmtbcmVsPVwic3R5bGVzaGVldFwiXScpXG4gICAgKS5tYXAoKGxpbmspID0+IGxpbmsuaHJlZik7XG4gICAgY29uc3QgaW1nTGlua3MgPSBBcnJheS5mcm9tKGRvY3VtZW50LmltYWdlcylcbiAgICAgICAgLm1hcCgoaW1nKSA9PiBpbWcuc3JjKVxuICAgICAgICAuZmlsdGVyKEJvb2xlYW4pO1xuICAgIGNvbnN0IGNzc0JnSW1hZ2VzID0gbmV3IFNldCgpO1xuICAgIEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIipcIikpLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgIGNvbnN0IGJnID0gZ2V0Q29tcHV0ZWRTdHlsZShlbCkuYmFja2dyb3VuZEltYWdlO1xuICAgICAgICBjb25zdCBtID0gYmcubWF0Y2goL3VybFxcKFtcIiddPyguKj8pW1wiJ10/XFwpLyk7XG4gICAgICAgIGlmIChtICYmIG1bMV0pIGNzc0JnSW1hZ2VzLmFkZChtWzFdKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGFsbEltYWdlcyA9IEFycmF5LmZyb20obmV3IFNldChbLi4uaW1nTGlua3MsIC4uLmNzc0JnSW1hZ2VzXSkpO1xuICAgIHJldHVybiB7XG4gICAgICAgIGpzOiBqc0xpbmtzLFxuICAgICAgICBjc3M6IGNzc0xpbmtzLFxuICAgICAgICBpbWc6IGFsbEltYWdlcyxcbiAgICB9O1xufTtcblxuLy8g5Zu+54mH54CR5biD5rWB5biD5bGAXG5jb25zdCBsYXlvdXRNYXNvbnJ5ID0gKGNvbnRhaW5lclNlbGVjdG9yLCBjb2x1bW5Db3VudCA9IDQsIHNwYWNpbmcgPSAxMCkgPT4ge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyU2VsZWN0b3IpO1xuICAgIGlmICghY29udGFpbmVyKSByZXR1cm47XG5cbiAgICBjb25zdCBpdGVtcyA9IEFycmF5LmZyb20oY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCJsYWJlbFwiKSk7XG4gICAgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgY29uc3QgaXRlbVdpZHRoID0gMjAwICsgc3BhY2luZyAqIDI7IC8vIOavj+S4quWbvueJh+mhueeahOWuveW6pu+8iOWQq+W3puWPsyBtYXJnaW7vvIlcbiAgICBsZXQgY29sdW1uSGVpZ2h0cyA9IEFycmF5KGNvbHVtbkNvdW50KS5maWxsKDApOyAvLyDlrZjlgqjmr4/kuIDliJfnmoTpq5jluqZcblxuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgLy8g5om+5Yiw5b2T5YmN5pyA55+t55qE5LiA5YiXXG4gICAgICAgIGNvbnN0IG1pbkhlaWdodCA9IE1hdGgubWluKC4uLmNvbHVtbkhlaWdodHMpO1xuICAgICAgICBjb25zdCBjb2xJbmRleCA9IGNvbHVtbkhlaWdodHMuaW5kZXhPZihtaW5IZWlnaHQpO1xuXG4gICAgICAgIC8vIOiuvue9rue7neWvueWumuS9jeS9jee9rlxuICAgICAgICBpdGVtLnN0eWxlLmxlZnQgPSBgJHtjb2xJbmRleCAqIGl0ZW1XaWR0aH1weGA7XG4gICAgICAgIGl0ZW0uc3R5bGUudG9wID0gYCR7bWluSGVpZ2h0fXB4YDtcblxuICAgICAgICAvLyDmm7TmlrDor6XliJfnmoTpq5jluqZcbiAgICAgICAgY29uc3QgaXRlbUhlaWdodCA9IGl0ZW0ub2Zmc2V0SGVpZ2h0O1xuICAgICAgICBjb2x1bW5IZWlnaHRzW2NvbEluZGV4XSArPSBpdGVtSGVpZ2h0O1xuICAgIH0pO1xufTtcblxuLy8g5Yib5bu66LWE5rqQ5YiX6KGo6Z2i5p2/O1xuY29uc3QgY3JlYXRlUmVzb3VyY2VQYW5lbCA9IChwaWNBcnJheSwgdHlwZSkgPT4ge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoc3R5bGUucGFuZWwpO1xuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCIke3N0eWxlLmhlYWR9XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRpdGxlXCI+6LWE5rqQ5YiX6KGoPC9zcGFuPlxuICAgICAgICAgICAgPHN2ZyBkYXRhLWlkPVwicGFuZWwtY2xvc2VcIiBjbGFzcz1cIiR7XG4gICAgICAgICAgICAgICAgc3R5bGUuY2xvc2VcbiAgICAgICAgICAgIH1cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA0OCA0OFwiPlxuICAgICAgICAgICAgICAgIDxwb2x5Z29uXG4gICAgICAgICAgICAgICAgICAgIGRhdGEtaWQ9XCJwYW5lbC1jbG9zZVwiXG4gICAgICAgICAgICAgICAgICAgIHBvaW50cz1cIjM1LjMxIDkuODYgMjQgMjEuMTcgMTIuNjkgOS44NiA5Ljg2IDEyLjY5IDIxLjE3IDI0IDkuODYgMzUuMzEgMTIuNjkgMzguMTQgMjQgMjYuODMgMzUuMzEgMzguMTQgMzguMTQgMzUuMzEgMjYuODMgMjQgMzguMTQgMTIuNjkgMzUuMzEgOS44NlwiIC8+XG4gICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgaWQ9XCIke3R5cGUgPT09IFwiaW1nXCIgPyBcIngtcGFuZWwtd2FsbFwiIDogXCJcIn1cIiBcbiAgICAgICAgY2xhc3M9XCIke3R5cGUgPT09IFwiaW1nXCIgPyBzdHlsZS53YWxsIDogc3R5bGUubGlzdH1cIj5cbiAgICAgICAgICAgICR7cGljQXJyYXlcbiAgICAgICAgICAgICAgICAubWFwKFxuICAgICAgICAgICAgICAgICAgICAodXJsKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiJHtzdHlsZS5pdGVtfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cIiR7dXJsfVwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlID09PSBcImltZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGA8aW1nIHNyYz1cIiR7dXJsfVwiIC8+YFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBgPHNwYW4+JHt1cmx9PC9zcGFuPmBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICBgXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5qb2luKFwiXFxuXCIpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIiR7c3R5bGUuZm9vdH1cIj5cbiAgICAgICAgICAgIDxidXR0b24gIGRhdGEtaWQ9XCJwYW5lbC1jbG9zZVwiPuWPlua2iDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLWlkPVwicGFuZWwtc3VibWl0XCIgZGF0YS10eXBlPVwiJHt0eXBlfVwiPua4hemZpDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICBcbmA7XG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcbn07XG5cbi8vIOWIm+W7uui+k+WFpeahhumdouadvztcbmNvbnN0IGNyZWF0ZUlucHV0UGFuZWwgPSAodHlwZSkgPT4ge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoc3R5bGUucGFuZWwpO1xuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCIke3N0eWxlLmhlYWR9XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRpdGxlXCI+5riF6Zmk5aSa5LiqdXJs6ZO+5o6lPC9zcGFuPlxuICAgICAgICAgICAgPHN2ZyBkYXRhLWlkPVwicGFuZWwtY2xvc2VcIiBjbGFzcz1cIiR7c3R5bGUuY2xvc2V9XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNDggNDhcIj5cbiAgICAgICAgICAgICAgICA8cG9seWdvblxuICAgICAgICAgICAgICAgICAgICBkYXRhLWlkPVwicGFuZWwtY2xvc2VcIlxuICAgICAgICAgICAgICAgICAgICBwb2ludHM9XCIzNS4zMSA5Ljg2IDI0IDIxLjE3IDEyLjY5IDkuODYgOS44NiAxMi42OSAyMS4xNyAyNCA5Ljg2IDM1LjMxIDEyLjY5IDM4LjE0IDI0IDI2LjgzIDM1LjMxIDM4LjE0IDM4LjE0IDM1LjMxIDI2LjgzIDI0IDM4LjE0IDEyLjY5IDM1LjMxIDkuODZcIiAvPlxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IFxuICAgICAgICBjbGFzcz1cIiR7c3R5bGUuaW5wdXRhcmVhfVwiPlxuICAgICAgICAgICAgPHRleHRhcmVhIGNvbHM9XCI4MFwiIHJvd3M9XCI2XCIgbmFtZT1cImlucHV0YXJlYVwiIHBsYWNlaG9sZGVyPVwi6L6T5YWldXJs6ZO+5o6lLOWkmuS4qumTvuaOpemcgOimgeWPpuWPluS4gOihjFwiPjwvdGV4dGFyZWE+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiJHtzdHlsZS5mb290fVwiPlxuICAgICAgICAgICAgPGJ1dHRvbiAgZGF0YS1pZD1cInBhbmVsLWNsb3NlXCI+5Y+W5raIPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGRhdGEtaWQ9XCJwYW5lbC1zdWJtaXRcIiBkYXRhLXR5cGU9XCIke3R5cGV9XCI+5riF6ZmkPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgIFxuYDtcbiAgICByZXR1cm4gY29udGFpbmVyO1xufTtcblxuLy8g5Yib5bu65L6n6L656I+c5Y2VXG5jb25zdCBjcmVhdGVNZW51ID0gKCkgPT4ge1xuICAgIGNvbnN0IG1lbnVFbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIG1lbnVFbGUuY2xhc3NMaXN0LmFkZChzdHlsZS5tZW51KTtcbiAgICBjb25zdCBlbnRyeUVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7IC8vIOWFpeWPo+aMiemSrlxuICAgIGVudHJ5RWxlLmNsYXNzTGlzdC5hZGQoc3R5bGUuZW50cnkpO1xuICAgIGVudHJ5RWxlLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxzdmcgY2xhc3M9XCIke3N0eWxlLmljb259XCIgd2lkdGg9XCIzNlwiIGhlaWdodD1cIjM2XCIgdmlld0JveD1cIjAgMCAxMDI0IDEwMjRcIiB2ZXJzaW9uPVwiMS4xXCJcbiAgICAgICAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgICAgPHBhdGggZmlsbD1cIiM4RDkyOUNcIlxuICAgICAgICAgICAgICAgICAgICBkPVwiTTg5NiA1MTJBMzg0IDM4NCAwIDAgMCA1MzMuMzMzMzMzIDEyOS4wNjY2NjdoLTIxLjMzMzMzM0EzODQgMzg0IDAgMCAwIDEyOS4wNjY2NjcgNDkwLjY2NjY2N3YyMS4zMzMzMzNBMzg0IDM4NCAwIDAgMCA0OTAuNjY2NjY3IDg5NmgyMS4zMzMzMzNhMzg0IDM4NCAwIDAgMCAzODQtMzYyLjY2NjY2N3YtMjEuMzMzMzMzeiBtLTg1LjMzMzMzMyAwdjEzLjAxMzMzM2ExMjggMTI4IDAgMCAxLTI0OS44MTMzMzQgMjMuODkzMzM0QTIxMy4zMzMzMzMgMjEzLjMzMzMzMyAwIDAgMCA3MjEuMDY2NjY3IDI5OC42NjY2NjcgMjk4LjY2NjY2NyAyOTguNjY2NjY3IDAgMCAxIDgxMC42NjY2NjcgNTEyek01MTIgMjEzLjMzMzMzM2gxMy4wMTMzMzNhMTI4IDEyOCAwIDAgMSAyMy44OTMzMzQgMjQ5LjgxMzMzNEEyMTMuMzMzMzMzIDIxMy4zMzMzMzMgMCAwIDAgMjk4LjY2NjY2NyAzMDIuOTMzMzMzIDI5OC42NjY2NjcgMjk4LjY2NjY2NyAwIDAgMSA1MTIgMjEzLjMzMzMzM3pNMjEzLjMzMzMzMyA1MTJ2LTEzLjAxMzMzM2ExMjggMTI4IDAgMCAxIDI0OS44MTMzMzQtMjMuODkzMzM0QTIxMy4zMzMzMzMgMjEzLjMzMzMzMyAwIDAgMCAzMDIuOTMzMzMzIDcyNS4zMzMzMzMgMjk4LjY2NjY2NyAyOTguNjY2NjY3IDAgMCAxIDIxMy4zMzMzMzMgNTEyeiBtMjk4LjY2NjY2NyAyOTguNjY2NjY3aC0xMy4wMTMzMzNhMTI4IDEyOCAwIDAgMS0yMy44OTMzMzQtMjQ5LjgxMzMzNEEyMTMuMzMzMzMzIDIxMy4zMzMzMzMgMCAwIDAgNzI1LjMzMzMzMyA3MjEuMDY2NjY3IDI5OC42NjY2NjcgMjk4LjY2NjY2NyAwIDAgMSA1MTIgODEwLjY2NjY2N3pcIiAvPlxuICAgICAgICAgICAgPC9zdmc+YDtcbiAgICBjb25zdCBtZW51VWxFbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7IC8vIOWFpeWPo+iPnOWNleWIl+ihqFxuICAgIG1lbnVVbEVsZS5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7c3R5bGUuaXRlbX1cIiBkYXRhLWlkPVwiaW1nc1wiPlxuICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzPVwiJHtzdHlsZS5pY29ufVwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMTAyNCAxMDI0XCIgdmVyc2lvbj1cIjEuMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPVwiIzhEOTI5Q1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZD1cIk04NTMuMzMzMzMzIDY4Mi42NjY2Njd2LTQyLjY2NjY2N2E0Mi42NjY2NjcgNDIuNjY2NjY3IDAgMCAwLTg1LjMzMzMzMyAwdjE3MC42NjY2NjdhNDIuNjY2NjY3IDQyLjY2NjY2NyAwIDAgMCA4NS4zMzMzMzMgMGgtNDIuNjY2NjY2di04NS4zMzMzMzRoMTI4djg1LjMzMzMzNGExMjggMTI4IDAgMCAxLTI1NiAwdi0xNzAuNjY2NjY3YTEyOCAxMjggMCAwIDEgMjU2IDB2NDIuNjY2NjY3eiBtLTUxMi04NS4zMzMzMzR2LTg1LjMzMzMzM0g4NS4zMzMzMzN2ODUuMzMzMzMzaDg1LjMzMzMzNHYyNTZIODUuMzMzMzMzdjg1LjMzMzMzNGgyNTZ2LTg1LjMzMzMzNGgtODUuMzMzMzMzVjU5Ny4zMzMzMzN6IG0yOTguNjY2NjY3LTg1LjMzMzMzM3Y0MjYuNjY2NjY3aC04NS4zMzMzMzNWNjU0LjI5MzMzM2wtNDIuNjY2NjY3IDU2Ljc0NjY2Ny00Mi42NjY2NjctNTYuNzQ2NjY3VjkzOC42NjY2NjdoLTg1LjMzMzMzM1Y1MTJoODUuMzMzMzMzbDQyLjY2NjY2NyA1Ni45Nkw1NTQuNjY2NjY3IDUxMnogbTg1LjMzMzMzMy00MjYuNjY2NjY3bDIxMy4zMzMzMzQgMjEzLjMzMzMzNHYxNzAuNjY2NjY2aC04NS4zMzMzMzR2LTEzNS4yNTMzMzNMNjg5LjkyIDE3MC42NjY2NjdIMTcwLjY2NjY2N3YyOTguNjY2NjY2SDg1LjMzMzMzM1Y4NS4zMzMzMzN6XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgICAgICAgIOWbvueJh+aWh+S7tlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHtzdHlsZS5pdGVtfVwiIGRhdGEtaWQ9XCJjc3NcIj5cbiAgICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzcz1cIiR7c3R5bGUuaWNvbn1cIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDEwMjQgMTAyNFwiIHZlcnNpb249XCIxLjFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbD1cIiM4RDkyOUNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ9XCJNNzI1LjMzMzMzMyA4NS4zMzMzMzNsMjEzLjMzMzMzNCAyMTMuMzMzMzM0djE3MC42NjY2NjZoLTg1LjMzMzMzNHYtMTM1LjI1MzMzM0w2ODkuOTIgMTcwLjY2NjY2N0gxNzAuNjY2NjY3djI5OC42NjY2NjZIODUuMzMzMzMzVjg1LjMzMzMzM3pNMjU2IDc2OHY0Mi42NjY2NjdhNDIuNjY2NjY3IDQyLjY2NjY2NyAwIDAgMS04NS4zMzMzMzMgMHYtMTcwLjY2NjY2N2E0Mi42NjY2NjcgNDIuNjY2NjY3IDAgMCAxIDg1LjMzMzMzMyAwdjQyLjY2NjY2N2g4NS4zMzMzMzN2LTQyLjY2NjY2N2ExMjggMTI4IDAgMCAwLTI1NiAwdjE3MC42NjY2NjdhMTI4IDEyOCAwIDAgMCAyNTYgMHYtNDIuNjY2NjY3eiBtMjU2LTg1LjMzMzMzM2E0Mi42NjY2NjcgNDIuNjY2NjY3IDAgMSAxIDQyLjY2NjY2Ny00Mi42NjY2NjdoODUuMzMzMzMzYTEyOCAxMjggMCAxIDAtMTI4IDEyOCA0Mi42NjY2NjcgNDIuNjY2NjY3IDAgMSAxLTQyLjY2NjY2NyA0Mi42NjY2NjdoLTg1LjMzMzMzM2ExMjggMTI4IDAgMSAwIDEyOC0xMjh6IG0yOTguNjY2NjY3IDBhNDIuNjY2NjY3IDQyLjY2NjY2NyAwIDEgMSA0Mi42NjY2NjYtNDIuNjY2NjY3aDg1LjMzMzMzNGExMjggMTI4IDAgMSAwLTEyOCAxMjggNDIuNjY2NjY3IDQyLjY2NjY2NyAwIDEgMS00Mi42NjY2NjcgNDIuNjY2NjY3aC04NS4zMzMzMzNhMTI4IDEyOCAwIDEgMCAxMjgtMTI4elwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgICBDU1Pmlofku7ZcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7c3R5bGUuaXRlbX1cIiBkYXRhLWlkPVwianNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzcz1cIiR7c3R5bGUuaWNvbn1cIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDEwMjQgMTAyNFwiIHZlcnNpb249XCIxLjFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbD1cIiM4RDkyOUNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ9XCJNOTM4LjY2NjY2NyAyOTguNjY2NjY3djY0MEg2ODIuNjY2NjY3di04NS4zMzMzMzRoMTcwLjY2NjY2NlYzMzQuMDhMNjg5LjkyIDE3MC42NjY2NjdIMTcwLjY2NjY2N3YyOTguNjY2NjY2SDg1LjMzMzMzM1Y4NS4zMzMzMzNoNjQwek01MTIgNjgyLjY2NjY2N2E0Mi42NjY2NjcgNDIuNjY2NjY3IDAgMSAxIDQyLjY2NjY2Ny00Mi42NjY2NjdoODUuMzMzMzMzYTEyOCAxMjggMCAxIDAtMTI4IDEyOCA0Mi42NjY2NjcgNDIuNjY2NjY3IDAgMSAxLTQyLjY2NjY2NyA0Mi42NjY2NjdoLTg1LjMzMzMzM2ExMjggMTI4IDAgMSAwIDEyOC0xMjh6IG0tMjU2LTE3MC42NjY2Njd2Mjk4LjY2NjY2N2E0Mi42NjY2NjcgNDIuNjY2NjY3IDAgMCAxLTg1LjMzMzMzMyAwdi00Mi42NjY2NjdIODUuMzMzMzMzdjQyLjY2NjY2N2ExMjggMTI4IDAgMCAwIDI1NiAwVjUxMnpcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICAgICAgSlPmlofku7ZcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7c3R5bGUuaXRlbX1cIiBkYXRhLWlkPVwibGlua1wiPlxuICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzPVwiJHtzdHlsZS5pY29ufVwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDQ4IDQ4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPVwiIzhEOTI5Q1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZD1cIk0xOCw0NFYzMGE2LDYsMCwwLDEsMTIsMFY0NEgyNlYzMGEyLDIsMCwwLDAtNCwwVjQ0Wk0xNiwyOFYyNEg0djRIOFY0MEg0djRIMTZWNDBIMTJWMjhaTTM0LDRINFYyMkg4VjhIMzIuMzRMNDAsMTUuNjZWMjJoNFYxNFpNMzIsMjRWNDRoNFYyNFptMTIsMEg0MEwzNiwzNGw0LDEwaDRMNDAsMzRaXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgICAgICAgIOW9k+WJjemTvuaOpVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHtzdHlsZS5pdGVtfVwiIGRhdGEtaWQ9XCJ1cmxzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3M9XCIke3N0eWxlLmljb259XCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNDggNDhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCIjOEQ5MjlDXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkPVwiTTQ0LDQwdjRIMzJWMjRoNFY0MFpNNDAsMTUuNjZWMjJoNFYxNEwzNCw0SDRWMjJIOFY4SDMyLjM0Wk0yOC4wOCwzNC4zOSwzMCw0NEgyNmwtMS42LThMMjQsMzZIMjJ2OEgxOFYyNGg2YTYsNiwwLDAsMSw0LjA4LDEwLjM5Wk0yNCwzMmEyLDIsMCwwLDAsMC00SDIydjRaTTEyLDI0VjM4YTIsMiwwLDAsMS00LDBWMjRINFYzOGE2LDYsMCwwLDAsMTIsMFYyNFpcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICAgICAg5aSa5Liq6ZO+5o6lXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2xpPlxuXG4gICAgYDtcblxuICAgIG1lbnVFbGUuYXBwZW5kQ2hpbGQoZW50cnlFbGUpO1xuICAgIG1lbnVFbGUuYXBwZW5kQ2hpbGQobWVudVVsRWxlKTtcbiAgICByZXR1cm4gbWVudUVsZTtcbn07XG5cbmlmICh3aW5kb3cuc2VsZiA9PT0gd2luZG93LnRvcCkge1xuICAgIGdldENmUmVzcG9uc2VIZWFkZXJzKHdpbmRvdy5sb2NhdGlvbi5ocmVmKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHh0b29sc0VsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgY29uc3QgbWVudUVsZSA9IGNyZWF0ZU1lbnUoKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXNvdXJjZXMgPSBnZXRSZXNvdXJjZXMoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwaWNQYW5lbEVsZSA9IGNyZWF0ZVJlc291cmNlUGFuZWwocmVzb3VyY2VzLmltZywgXCJpbWdcIik7XG4gICAgICAgICAgICAgICAgY29uc3QgY3NzUGFuZWxFbGUgPSBjcmVhdGVSZXNvdXJjZVBhbmVsKHJlc291cmNlcy5jc3MsIFwiY3NzXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGpzUGFuZWxFbGUgPSBjcmVhdGVSZXNvdXJjZVBhbmVsKHJlc291cmNlcy5qcywgXCJqc1wiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpbnB1dFBhbmVsRWxlID0gY3JlYXRlSW5wdXRQYW5lbChcInVybHNcIik7XG5cbiAgICAgICAgICAgICAgICAvLyDpgY3ljoZjaGlsZE5vZGVz77yM56e76Zmkc2hvd+agt+W8j1xuICAgICAgICAgICAgICAgIGNvbnN0IGNsb3NlUGFuZWwgPSAobm9kZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKHN0eWxlLnNob3cpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgLy8g5a+56I+c5Y2V6aG555qE54K55Ye75LqL5Lu26L+b6KGM55uR5ZCsXG4gICAgICAgICAgICAgICAgeHRvb2xzRWxlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZS50YXJnZXQuZGF0YXNldC5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImltZ3NcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDpgInmi6nlm77niYdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZVBhbmVsKHRoaXMuY2hpbGROb2Rlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGljUGFuZWxFbGUuY2xhc3NMaXN0LmFkZChzdHlsZS5zaG93KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXlvdXRNYXNvbnJ5KFwiI3gtcGFuZWwtd2FsbFwiLCA0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjc3NcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDpgInmi6ljc3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZVBhbmVsKHRoaXMuY2hpbGROb2Rlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzUGFuZWxFbGUuY2xhc3NMaXN0LmFkZChzdHlsZS5zaG93KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJqc1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOmAieaLqWpzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQYW5lbCh0aGlzLmNoaWxkTm9kZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpzUGFuZWxFbGUuY2xhc3NMaXN0LmFkZChzdHlsZS5zaG93KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJsaW5rXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5riF6Zmk5b2T5YmNbGlua1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyQ2FjaGUoW3dpbmRvdy5sb2NhdGlvbi5ocmVmXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwidXJsc1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUGFuZWwodGhpcy5jaGlsZE5vZGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDovpPlhaV1cmxzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRQYW5lbEVsZS5jbGFzc0xpc3QuYWRkKHN0eWxlLnNob3cpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwicGFuZWwtc3VibWl0XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDojrflj5ZpbnB1dFBhbmVsRWxl5LitdGV4dGFyZWHnmoR2YWx1ZSDku6Xlm57ovabliIblibLmiJDmlbDnu4QgLy8g5aaC5p6cdGV4dGFyZWEg5Li656m6IOWImei/lOWbnuepuuaVsOe7hFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0VXJscyA9IGlucHV0UGFuZWxFbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCJ0ZXh0YXJlYVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudmFsdWUuc3BsaXQoXCJcXG5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihCb29sZWFuKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi54dG9vbHNFbGUucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5wdXRbdHlwZT0nY2hlY2tib3gnXTpjaGVja2VkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLm1hcCgoYykgPT4gYy52YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhckNhY2hlKFsuLi5pbnB1dFVybHMsIC4uLnNlbGVjdGVkXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInBhbmVsLWNsb3NlXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDpgY3ljoZjaGlsZE5vZGVz77yM56e76Zmkc2hvd+agt+W8j1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQYW5lbCh0aGlzLmNoaWxkTm9kZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g6YGN5Y6G5omA5pyJ55qEY2hlY2tib3gs5Y+W5raI6YCJ5LitXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFt0eXBlPWNoZWNrYm94XVwiKS5mb3JFYWNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjaGVja2JveCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2JveC5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOa4heepunRleHRhcmVh55qE5YC8XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnF1ZXJ5U2VsZWN0b3IoXCJ0ZXh0YXJlYVwiKS52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB4dG9vbHNFbGUuYXBwZW5kQ2hpbGQobWVudUVsZSk7XG4gICAgICAgICAgICAgICAgeHRvb2xzRWxlLmFwcGVuZENoaWxkKHBpY1BhbmVsRWxlKTtcbiAgICAgICAgICAgICAgICB4dG9vbHNFbGUuYXBwZW5kQ2hpbGQoY3NzUGFuZWxFbGUpO1xuICAgICAgICAgICAgICAgIHh0b29sc0VsZS5hcHBlbmRDaGlsZChqc1BhbmVsRWxlKTtcbiAgICAgICAgICAgICAgICB4dG9vbHNFbGUuYXBwZW5kQ2hpbGQoaW5wdXRQYW5lbEVsZSk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh4dG9vbHNFbGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQUFBLFNBQVMsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7RUFDL0IsRUFBRSxLQUFLLEdBQUcsS0FBSyxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDO0VBQ2pDLEVBQUUsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQztBQUM5QjtFQUNB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
