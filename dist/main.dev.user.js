
// ==UserScript==
// @name           Cloudflare 缓存清除工具 Dev
// @namespace      https://github.com/JsBeta/cloudflare-cache-purge/
// @version        1.5.0
// @author         xuwei
// @description    一个好用的 Cloudflare 缓存清理工具，支持清除当前页面链接缓存、图片/CSS/JS 资源缓存，以及自定义多个 URL 的缓存清除。
// @icon           data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSIjZTc4OTMwIiBkPSJNODAwLjIxMzMzMyA0MzQuMzQ2NjY3YTI5OC42NjY2NjcgMjk4LjY2NjY2NyAwIDAgMC01NjEuOTItNDEuNkEyMTMuMzMzMzMzIDIxMy4zMzMzMzMgMCAwIDAgMjk4LjY2NjY2NyA4MTAuNjY2NjY3aDQ0OGExOTIgMTkyIDAgMCAwIDUzLjU0NjY2Ni0zNzYuMzJ6TTc0Ni42NjY2NjcgNzI1LjMzMzMzM0gyOTguNjY2NjY3YTEyOCAxMjggMCAwIDEgMC0yNTZoNC4yNjY2NjZBMjEzLjMzMzMzMyAyMTMuMzMzMzMzIDAgMCAxIDcyNS4zMzMzMzMgNTEyYTcuMjUzMzMzIDcuMjUzMzMzIDAgMCAxIDAgMi4xMzMzMzMgMTIwLjk2IDEyMC45NiAwIDAgMSAyMS4zMzMzMzQtMi4xMzMzMzMgMTA2LjY2NjY2NyAxMDYuNjY2NjY3IDAgMCAxIDAgMjEzLjMzMzMzM3ogbS0yMzQuNjY2NjY3LTQyLjY2NjY2NmExNDkuMzMzMzMzIDE0OS4zMzMzMzMgMCAxIDEgMTQ5LjMzMzMzMy0xNDkuMzMzMzM0aC04NS4zMzMzMzNhNjQgNjQgMCAxIDAtNjQgNjR6IiAvPjwvc3ZnPg==
// @include        *
// @connect        api.cloudflare.com
// @run-at         document-end
// @grant          GM_notification
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

  var css_248z = ".main_icon__RYCes {\n  display: inline-block;\n  vertical-align: middle;\n}\n.main_icon__RYCes path {\n  fill: #e78930;\n}\n.main_menu__MLtUQ {\n  position: fixed;\n  width: 40px;\n  right: 0;\n  top: 214px;\n  z-index: 100;\n  box-sizing: content-box;\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n}\n.main_menu__MLtUQ:hover ul {\n  right: 0px;\n}\n.main_menu__MLtUQ:hover .main_entry__oOnCr {\n  background: #0a4b85;\n  opacity: 1;\n}\n.main_menu__MLtUQ .main_entry__oOnCr {\n  padding: 3px;\n  cursor: pointer;\n  background: #fff;\n  border-radius: 25% 0 0 25%;\n  margin-bottom: 5px;\n  box-shadow: 2px 6px 10px 0px #0e121629;\n  opacity: 0.5;\n  transition: all 0.3s ease-in-out;\n}\n.main_menu__MLtUQ .main_entry__oOnCr .main_icon__RYCes path {\n  fill: #e78930;\n}\n.main_menu__MLtUQ .main_entry__oOnCr .main_icon__RYCes:hover {\n  rotate: 180deg;\n  transition: all 0.5s ease-in-out;\n}\n.main_menu__MLtUQ ul {\n  position: absolute;\n  transition: all 0.3s ease-in-out;\n  right: -40px;\n  margin: 0;\n  padding: 0;\n}\n.main_menu__MLtUQ li {\n  height: 34px;\n  margin-bottom: 2px;\n  list-style: none;\n  cursor: pointer;\n  position: relative;\n}\n.main_menu__MLtUQ li:hover .main_item__njE-F {\n  width: 85px;\n}\n.main_menu__MLtUQ li:hover .main_icon__RYCes path {\n  fill: #fff;\n}\n.main_menu__MLtUQ .main_item__njE-F {\n  box-sizing: content-box;\n  overflow: hidden;\n  white-space: nowrap;\n  width: 24px;\n  height: 24px;\n  line-height: 24px;\n  padding: 5px 5px 6px 5px;\n  position: absolute;\n  top: 0;\n  right: 0;\n  font-size: 12px;\n  color: #fff;\n  background: #0a4b85;\n  border-radius: 2px 0px 0px 2px;\n  transition: width 0.3s ease-in;\n}\n.main_menu__MLtUQ .main_item__njE-F:hover {\n  background: #e78930;\n}\n.main_menu__MLtUQ .main_item__njE-F .main_icon__RYCes {\n  margin-right: 5px;\n  transform: translateY(-1px);\n}\n.main_panel__t3SIt {\n  display: none;\n  border: 1px solid #ccc;\n  border-radius: 8px;\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);\n  background: #fff;\n  z-index: 9999;\n}\n.main_panel__t3SIt.main_show__HRMDu {\n  display: block;\n}\n.main_panel__t3SIt .main_close__2MGVA {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  cursor: pointer;\n  width: 20px;\n  height: 20px;\n}\n.main_panel__t3SIt .main_head__AwcOE {\n  height: 40px;\n  line-height: 40px;\n  padding: 0 20px;\n  border-bottom: 1px solid #ccc;\n  color: #000;\n  font-size: 16px;\n  font-weight: 600;\n}\n.main_panel__t3SIt .main_foot__-LFyQ {\n  height: 55px;\n  line-height: 40px;\n  padding: 5px 20px;\n  display: flex;\n  justify-content: flex-end;\n  gap: 20px;\n  align-items: center;\n  border-top: 1px solid #ccc;\n}\n.main_panel__t3SIt .main_foot__-LFyQ button {\n  cursor: pointer;\n  height: 35px;\n  line-height: 35px;\n  padding: 0px 30px;\n  background: #e78930;\n  color: #fff;\n  font-size: 14px;\n  border: none;\n  border-radius: 8px;\n}\n.main_panel__t3SIt .main_foot__-LFyQ button[data-id=\"panel-close\"] {\n  background: #ccc;\n  color: #333;\n}\n.main_panel__t3SIt .main_foot__-LFyQ button[data-id=\"panel-close\"]:hover {\n  color: #fff;\n}\n.main_panel__t3SIt .main_foot__-LFyQ button:hover {\n  background: #c46d1c;\n}\n.main_panel__t3SIt .main_wall__0tq2S {\n  position: relative;\n  width: 900px;\n  /* 4列 × (200px + gap) */\n  height: 700px;\n  overflow-y: auto;\n  z-index: 99;\n}\n.main_panel__t3SIt .main_wall__0tq2S .main_item__njE-F {\n  box-sizing: content-box;\n  position: relative;\n  display: inline-block;\n  padding: 10px;\n  vertical-align: top;\n  position: absolute;\n  transition: opacity 0.3s;\n}\n.main_panel__t3SIt .main_wall__0tq2S img {\n  cursor: pointer;\n  box-sizing: content-box;\n  width: 200px;\n  height: auto;\n  display: block;\n}\n.main_panel__t3SIt .main_wall__0tq2S input[type=\"checkbox\"] {\n  position: absolute;\n  top: 5px;\n  left: 5px;\n  z-index: 1;\n}\n.main_panel__t3SIt .main_wall__0tq2S input[type=\"checkbox\"] {\n  display: none;\n}\n.main_panel__t3SIt .main_wall__0tq2S input[type=\"checkbox\"]:checked + img {\n  box-shadow: 0 0 0 2px rgba(245, 148, 3, 0.76);\n}\n.main_panel__t3SIt .main_list__f6SQm {\n  padding: 20px;\n  position: relative;\n  width: 900px;\n  max-height: 600px;\n  overflow-y: auto;\n  z-index: 99;\n}\n.main_panel__t3SIt .main_list__f6SQm .main_item__njE-F {\n  cursor: pointer;\n  display: block;\n  padding: 0 5px;\n  margin-bottom: 8px;\n}\n.main_panel__t3SIt .main_list__f6SQm .main_item__njE-F span {\n  display: inline-block;\n  padding: 5px;\n  margin-left: 5px;\n  border-radius: 5px;\n}\n.main_panel__t3SIt .main_list__f6SQm input[type=\"checkbox\"]:checked + span {\n  box-shadow: 0 0 0 2px rgba(245, 148, 3, 0.76);\n}\n.main_panel__t3SIt .main_inputarea__mzOdr {\n  padding: 20px;\n  position: relative;\n  width: 600px;\n  max-height: 600px;\n  overflow-y: auto;\n  z-index: 99;\n}\n.main_panel__t3SIt .main_inputarea__mzOdr textarea {\n  padding: 10px;\n  margin-top: 10px;\n  border: 1px solid #e78930;\n  line-height: 2;\n  border-radius: 5px;\n  max-width: 575px;\n  min-width: 575px;\n}\n.main_panel__t3SIt .main_inputarea__mzOdr textarea:focus {\n  outline: none;\n  border: 1px solid #fff;\n  box-shadow: 0 0 0 2px rgba(245, 148, 3, 0.76);\n}\n";
  var style = {"icon":"main_icon__RYCes","menu":"main_menu__MLtUQ","entry":"main_entry__oOnCr","item":"main_item__njE-F","panel":"main_panel__t3SIt","show":"main_show__HRMDu","close":"main_close__2MGVA","head":"main_head__AwcOE","foot":"main_foot__-LFyQ","wall":"main_wall__0tq2S","list":"main_list__f6SQm","inputarea":"main_inputarea__mzOdr"};
  styleInject(css_248z);

  GM_notification({
      text: "This is a notification",
      title: "Notification Title",
      timeout: 4000,
  });

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
                      "Failed to purge cache: " +
                          (result.errors?.[0]?.message || "Unknown error")
                  );
              }
          },
          onerror: function (error) {
              alert("Error purging cache: " + error.responseText);
          },
      });
  }

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
      window.addEventListener("load", function () {
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

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5kZXYudXNlci5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWluamVjdC9kaXN0L3N0eWxlLWluamVjdC5lcy5qcyIsIi4uL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHN0eWxlSW5qZWN0KGNzcywgcmVmKSB7XG4gIGlmICggcmVmID09PSB2b2lkIDAgKSByZWYgPSB7fTtcbiAgdmFyIGluc2VydEF0ID0gcmVmLmluc2VydEF0O1xuXG4gIGlmICghY3NzIHx8IHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuOyB9XG5cbiAgdmFyIGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gIHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gIHN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xuXG4gIGlmIChpbnNlcnRBdCA9PT0gJ3RvcCcpIHtcbiAgICBpZiAoaGVhZC5maXJzdENoaWxkKSB7XG4gICAgICBoZWFkLmluc2VydEJlZm9yZShzdHlsZSwgaGVhZC5maXJzdENoaWxkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICB9XG5cbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgc3R5bGVJbmplY3Q7XG4iLCJpbXBvcnQgc3R5bGUgZnJvbSBcIi4vc3R5bGVzL21haW4ubGVzc1wiO1xuXG5HTV9ub3RpZmljYXRpb24oe1xuICAgIHRleHQ6IFwiVGhpcyBpcyBhIG5vdGlmaWNhdGlvblwiLFxuICAgIHRpdGxlOiBcIk5vdGlmaWNhdGlvbiBUaXRsZVwiLFxuICAgIHRpbWVvdXQ6IDQwMDAsXG59KTtcblxuLy8g6YWN572u5L+h5oGvXG5sZXQgY29uZmlnID0ge1xuICAgIGFwaVRva2VuOiBHTV9nZXRWYWx1ZShcImNmQXBpVG9rZW5cIiwgXCJcIiksXG59O1xuXG4vLyDmt7vliqDphY3nva7oj5zljZVcbkdNX3JlZ2lzdGVyTWVudUNvbW1hbmQoXCLphY3nva4gQVBJIFRva2VuXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBhcGlUb2tlbiA9IHByb21wdChcbiAgICAgICAgXCLor7fovpPlhaXmgqjnmoQgQ2xvdWRmbGFyZSBBUEkgVG9rZW46XCIsXG4gICAgICAgIGNvbmZpZy5hcGlUb2tlblxuICAgICk7XG4gICAgaWYgKGFwaVRva2VuICE9PSBudWxsKSB7XG4gICAgICAgIEdNX3NldFZhbHVlKFwiY2ZBcGlUb2tlblwiLCBhcGlUb2tlbik7XG4gICAgICAgIGNvbmZpZy5hcGlUb2tlbiA9IGFwaVRva2VuO1xuICAgIH1cbn0pO1xuXG4vLyDmt7vliqDmuIXpmaTnvJPlrZjoj5zljZXlkozpobXpnaLmjInpkq5cbkdNX3JlZ2lzdGVyTWVudUNvbW1hbmQoXCLmuIXpmaTlvZPliY3lnLDlnYDnvJPlrZhcIiwgZnVuY3Rpb24gKCkge1xuICAgIGNsZWFyQ2FjaGUoW3dpbmRvdy5sb2NhdGlvbi5ocmVmXSk7XG59KTtcbi8vIOS/ruaUuemqjOivgemFjee9rlxuZnVuY3Rpb24gdmFsaWRhdGVDb25maWcoKSB7XG4gICAgaWYgKCFjb25maWcuYXBpVG9rZW4pIHtcbiAgICAgICAgYWxlcnQoXCLor7flhYjphY3nva5DbG91ZGZsYXJlIEFQSSBUb2tlbi5cIik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbi8vIOafpeaJvnpvbmVpZFxuYXN5bmMgZnVuY3Rpb24gZ2V0Wm9uZUlkKGRvbWFpbikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIuato+WcqOiOt+WPluWfn+WQjTpcIiwgZG9tYWluKTtcbiAgICAgICAgR01feG1saHR0cFJlcXVlc3Qoe1xuICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICAgICAgdXJsOiBgaHR0cHM6Ly9hcGkuY2xvdWRmbGFyZS5jb20vY2xpZW50L3Y0L3pvbmVzP25hbWU9JHtkb21haW59YCxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7Y29uZmlnLmFwaVRva2VufWAsXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25sb2FkOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFQSeWTjeW6lOeKtuaAgTpcIiwgcmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShyZXNwb25zZS5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5a6M5pW0QVBJ5ZON5bqUOlwiLCBkYXRhKTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5yZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhLnJlc3VsdFswXT8uaWQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLojrflj5Zab25lIElE5aSx6LSlOlwiLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG4vLyDmuIXpmaTnvJPlrZjlh73mlbBcbmFzeW5jIGZ1bmN0aW9uIGNsZWFyQ2FjaGUodXJscykge1xuICAgIGNvbnNvbGUubG9nKFwi5byA5aeL5riF6Zmk57yT5a2Y5rWB56iLXCIpO1xuICAgIGlmICghdXJscy5sZW5ndGgpIHtcbiAgICAgICAgYWxlcnQoXCLor7fpgInmi6nmiJbogIXovpPlhaXpnIDopoHmuIXpmaTnmoTnvJPlrZjpobnvvIFcIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF2YWxpZGF0ZUNvbmZpZygpKSByZXR1cm47XG4gICAgbGV0IGRvbWFpbiA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpLmhvc3RuYW1lO1xuICAgIC8vIOWOu+mZpGRvbWFpbueahHd3d+WJjee8gFxuICAgIGRvbWFpbiA9IGRvbWFpbi5yZXBsYWNlKC9ed3d3XFwuLywgXCJcIik7XG4gICAgY29uc29sZS5sb2coXCLop6PmnpDlh7rnmoTln5/lkI06XCIsIGRvbWFpbik7XG4gICAgY29uc3Qgem9uZUlkID0gYXdhaXQgZ2V0Wm9uZUlkKGRvbWFpbik7XG4gICAgaWYgKCF6b25lSWQpIHtcbiAgICAgICAgYWxlcnQoXCLmnKrmib7liLDor6Xln5/lkI3lr7nlupTnmoRDbG91ZGZsYXJlIHpvbmUs6K+35qOA5p+l5Z+f5ZCN5piv5ZCm5q2j56Gu77yBXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIOS9v+eUqOWKqOaAgXpvbmVJZOWPkemAgeivt+axgi4uLlxuICAgIGF3YWl0IHB1cmdlQ2FjaGUoem9uZUlkLCB1cmxzKTtcbn1cblxuLy8g5riF6Zmk57yT5a2Y5bCB6KOFXG5mdW5jdGlvbiBwdXJnZUNhY2hlKHpvbmdlSWQsIHVybHMpIHtcbiAgICBjb25zdCBhcGlVcmwgPSBgaHR0cHM6Ly9hcGkuY2xvdWRmbGFyZS5jb20vY2xpZW50L3Y0L3pvbmVzLyR7em9uZ2VJZH0vcHVyZ2VfY2FjaGVgO1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBcIiVjIFsg6ZyA6KaB5riF6Zmk55qEdXJscyBdOiBcIixcbiAgICAgICAgXCJjb2xvcjogI2JmMmM5ZjsgYmFja2dyb3VuZDogcGluazsgZm9udC1zaXplOiAxM3B4O1wiLFxuICAgICAgICB1cmxzXG4gICAgKTtcbiAgICBHTV94bWxodHRwUmVxdWVzdCh7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIHVybDogYXBpVXJsLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7Y29uZmlnLmFwaVRva2VufWAsXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgZmlsZXM6IFsuLi51cmxzXSxcbiAgICAgICAgfSksXG4gICAgICAgIG9ubG9hZDogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBKU09OLnBhcnNlKHJlc3BvbnNlLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBhbGVydChcIue8k+WtmOa4heeQhuaIkOWKnyFcIik7XG4gICAgICAgICAgICAgICAgLy8g5Yi35paw5b2T5YmN6aG16Z2iXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydChcbiAgICAgICAgICAgICAgICAgICAgXCJGYWlsZWQgdG8gcHVyZ2UgY2FjaGU6IFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIChyZXN1bHQuZXJyb3JzPy5bMF0/Lm1lc3NhZ2UgfHwgXCJVbmtub3duIGVycm9yXCIpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb25lcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBhbGVydChcIkVycm9yIHB1cmdpbmcgY2FjaGU6IFwiICsgZXJyb3IucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgfSxcbiAgICB9KTtcbn1cblxuLy8g6I635Y+W6LWE5rqQ6ZO+5o6lXG5jb25zdCBnZXRSZXNvdXJjZXMgPSAoKSA9PiB7XG4gICAgY29uc3QgYmxhY2tsaXN0ZWRQYXR0ZXJucyA9IFtcbiAgICAgICAgL2FuYWx5dGljc1xcLmV4YW1wbGVcXC5jb20vLFxuICAgICAgICAvd3d3XFwuY2xhcml0eS8sXG4gICAgICAgIC93d3dcXC5nb29nbGUvLFxuICAgICAgICAvYXBwXFwudGVybWx5LyxcbiAgICBdO1xuICAgIGNvbnN0IGpzTGlua3MgPSBBcnJheS5mcm9tKGRvY3VtZW50LnNjcmlwdHMpXG4gICAgICAgIC5tYXAoKHMpID0+IHMuc3JjKVxuICAgICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAgIC5maWx0ZXIoXG4gICAgICAgICAgICAodXJsKSA9PiAhYmxhY2tsaXN0ZWRQYXR0ZXJucy5zb21lKChwYXR0ZXJuKSA9PiBwYXR0ZXJuLnRlc3QodXJsKSlcbiAgICAgICAgKTtcbiAgICBjb25zdCBjc3NMaW5rcyA9IEFycmF5LmZyb20oXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpbmtbcmVsPVwic3R5bGVzaGVldFwiXScpXG4gICAgKS5tYXAoKGxpbmspID0+IGxpbmsuaHJlZik7XG4gICAgY29uc3QgaW1nTGlua3MgPSBBcnJheS5mcm9tKGRvY3VtZW50LmltYWdlcylcbiAgICAgICAgLm1hcCgoaW1nKSA9PiBpbWcuc3JjKVxuICAgICAgICAuZmlsdGVyKEJvb2xlYW4pO1xuICAgIGNvbnN0IGNzc0JnSW1hZ2VzID0gbmV3IFNldCgpO1xuICAgIEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIipcIikpLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgIGNvbnN0IGJnID0gZ2V0Q29tcHV0ZWRTdHlsZShlbCkuYmFja2dyb3VuZEltYWdlO1xuICAgICAgICBjb25zdCBtID0gYmcubWF0Y2goL3VybFxcKFtcIiddPyguKj8pW1wiJ10/XFwpLyk7XG4gICAgICAgIGlmIChtICYmIG1bMV0pIGNzc0JnSW1hZ2VzLmFkZChtWzFdKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGFsbEltYWdlcyA9IEFycmF5LmZyb20obmV3IFNldChbLi4uaW1nTGlua3MsIC4uLmNzc0JnSW1hZ2VzXSkpO1xuICAgIHJldHVybiB7XG4gICAgICAgIGpzOiBqc0xpbmtzLFxuICAgICAgICBjc3M6IGNzc0xpbmtzLFxuICAgICAgICBpbWc6IGFsbEltYWdlcyxcbiAgICB9O1xufTtcblxuLy8g5Zu+54mH54CR5biD5rWB5biD5bGAXG5jb25zdCBsYXlvdXRNYXNvbnJ5ID0gKGNvbnRhaW5lclNlbGVjdG9yLCBjb2x1bW5Db3VudCA9IDQsIHNwYWNpbmcgPSAxMCkgPT4ge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyU2VsZWN0b3IpO1xuICAgIGlmICghY29udGFpbmVyKSByZXR1cm47XG5cbiAgICBjb25zdCBpdGVtcyA9IEFycmF5LmZyb20oY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCJsYWJlbFwiKSk7XG4gICAgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgY29uc3QgaXRlbVdpZHRoID0gMjAwICsgc3BhY2luZyAqIDI7IC8vIOavj+S4quWbvueJh+mhueeahOWuveW6pu+8iOWQq+W3puWPsyBtYXJnaW7vvIlcbiAgICBsZXQgY29sdW1uSGVpZ2h0cyA9IEFycmF5KGNvbHVtbkNvdW50KS5maWxsKDApOyAvLyDlrZjlgqjmr4/kuIDliJfnmoTpq5jluqZcblxuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgLy8g5om+5Yiw5b2T5YmN5pyA55+t55qE5LiA5YiXXG4gICAgICAgIGNvbnN0IG1pbkhlaWdodCA9IE1hdGgubWluKC4uLmNvbHVtbkhlaWdodHMpO1xuICAgICAgICBjb25zdCBjb2xJbmRleCA9IGNvbHVtbkhlaWdodHMuaW5kZXhPZihtaW5IZWlnaHQpO1xuXG4gICAgICAgIC8vIOiuvue9rue7neWvueWumuS9jeS9jee9rlxuICAgICAgICBpdGVtLnN0eWxlLmxlZnQgPSBgJHtjb2xJbmRleCAqIGl0ZW1XaWR0aH1weGA7XG4gICAgICAgIGl0ZW0uc3R5bGUudG9wID0gYCR7bWluSGVpZ2h0fXB4YDtcblxuICAgICAgICAvLyDmm7TmlrDor6XliJfnmoTpq5jluqZcbiAgICAgICAgY29uc3QgaXRlbUhlaWdodCA9IGl0ZW0ub2Zmc2V0SGVpZ2h0O1xuICAgICAgICBjb2x1bW5IZWlnaHRzW2NvbEluZGV4XSArPSBpdGVtSGVpZ2h0O1xuICAgIH0pO1xufTtcblxuLy8g5Yib5bu66LWE5rqQ5YiX6KGo6Z2i5p2/O1xuY29uc3QgY3JlYXRlUmVzb3VyY2VQYW5lbCA9IChwaWNBcnJheSwgdHlwZSkgPT4ge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoc3R5bGUucGFuZWwpO1xuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCIke3N0eWxlLmhlYWR9XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRpdGxlXCI+6LWE5rqQ5YiX6KGoPC9zcGFuPlxuICAgICAgICAgICAgPHN2ZyBkYXRhLWlkPVwicGFuZWwtY2xvc2VcIiBjbGFzcz1cIiR7XG4gICAgICAgICAgICAgICAgc3R5bGUuY2xvc2VcbiAgICAgICAgICAgIH1cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA0OCA0OFwiPlxuICAgICAgICAgICAgICAgIDxwb2x5Z29uXG4gICAgICAgICAgICAgICAgICAgIGRhdGEtaWQ9XCJwYW5lbC1jbG9zZVwiXG4gICAgICAgICAgICAgICAgICAgIHBvaW50cz1cIjM1LjMxIDkuODYgMjQgMjEuMTcgMTIuNjkgOS44NiA5Ljg2IDEyLjY5IDIxLjE3IDI0IDkuODYgMzUuMzEgMTIuNjkgMzguMTQgMjQgMjYuODMgMzUuMzEgMzguMTQgMzguMTQgMzUuMzEgMjYuODMgMjQgMzguMTQgMTIuNjkgMzUuMzEgOS44NlwiIC8+XG4gICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgaWQ9XCIke3R5cGUgPT09IFwiaW1nXCIgPyBcIngtcGFuZWwtd2FsbFwiIDogXCJcIn1cIiBcbiAgICAgICAgY2xhc3M9XCIke3R5cGUgPT09IFwiaW1nXCIgPyBzdHlsZS53YWxsIDogc3R5bGUubGlzdH1cIj5cbiAgICAgICAgICAgICR7cGljQXJyYXlcbiAgICAgICAgICAgICAgICAubWFwKFxuICAgICAgICAgICAgICAgICAgICAodXJsKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiJHtzdHlsZS5pdGVtfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cIiR7dXJsfVwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlID09PSBcImltZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGA8aW1nIHNyYz1cIiR7dXJsfVwiIC8+YFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBgPHNwYW4+JHt1cmx9PC9zcGFuPmBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICBgXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5qb2luKFwiXFxuXCIpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIiR7c3R5bGUuZm9vdH1cIj5cbiAgICAgICAgICAgIDxidXR0b24gIGRhdGEtaWQ9XCJwYW5lbC1jbG9zZVwiPuWPlua2iDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLWlkPVwicGFuZWwtc3VibWl0XCIgZGF0YS10eXBlPVwiJHt0eXBlfVwiPua4hemZpDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICBcbmA7XG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcbn07XG5cbi8vIOWIm+W7uui+k+WFpeahhumdouadvztcbmNvbnN0IGNyZWF0ZUlucHV0UGFuZWwgPSAodHlwZSkgPT4ge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoc3R5bGUucGFuZWwpO1xuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCIke3N0eWxlLmhlYWR9XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRpdGxlXCI+5riF6Zmk5aSa5LiqdXJs6ZO+5o6lPC9zcGFuPlxuICAgICAgICAgICAgPHN2ZyBkYXRhLWlkPVwicGFuZWwtY2xvc2VcIiBjbGFzcz1cIiR7c3R5bGUuY2xvc2V9XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNDggNDhcIj5cbiAgICAgICAgICAgICAgICA8cG9seWdvblxuICAgICAgICAgICAgICAgICAgICBkYXRhLWlkPVwicGFuZWwtY2xvc2VcIlxuICAgICAgICAgICAgICAgICAgICBwb2ludHM9XCIzNS4zMSA5Ljg2IDI0IDIxLjE3IDEyLjY5IDkuODYgOS44NiAxMi42OSAyMS4xNyAyNCA5Ljg2IDM1LjMxIDEyLjY5IDM4LjE0IDI0IDI2LjgzIDM1LjMxIDM4LjE0IDM4LjE0IDM1LjMxIDI2LjgzIDI0IDM4LjE0IDEyLjY5IDM1LjMxIDkuODZcIiAvPlxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IFxuICAgICAgICBjbGFzcz1cIiR7c3R5bGUuaW5wdXRhcmVhfVwiPlxuICAgICAgICAgICAgPHRleHRhcmVhIGNvbHM9XCI4MFwiIHJvd3M9XCI2XCIgbmFtZT1cImlucHV0YXJlYVwiIHBsYWNlaG9sZGVyPVwi6L6T5YWldXJs6ZO+5o6lLOWkmuS4qumTvuaOpemcgOimgeWPpuWPluS4gOihjFwiPjwvdGV4dGFyZWE+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiJHtzdHlsZS5mb290fVwiPlxuICAgICAgICAgICAgPGJ1dHRvbiAgZGF0YS1pZD1cInBhbmVsLWNsb3NlXCI+5Y+W5raIPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGRhdGEtaWQ9XCJwYW5lbC1zdWJtaXRcIiBkYXRhLXR5cGU9XCIke3R5cGV9XCI+5riF6ZmkPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgIFxuYDtcbiAgICByZXR1cm4gY29udGFpbmVyO1xufTtcblxuLy8g5Yib5bu65L6n6L656I+c5Y2VXG5jb25zdCBjcmVhdGVNZW51ID0gKCkgPT4ge1xuICAgIGNvbnN0IG1lbnVFbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIG1lbnVFbGUuY2xhc3NMaXN0LmFkZChzdHlsZS5tZW51KTtcbiAgICBjb25zdCBlbnRyeUVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7IC8vIOWFpeWPo+aMiemSrlxuICAgIGVudHJ5RWxlLmNsYXNzTGlzdC5hZGQoc3R5bGUuZW50cnkpO1xuICAgIGVudHJ5RWxlLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxzdmcgY2xhc3M9XCIke3N0eWxlLmljb259XCIgd2lkdGg9XCIzNlwiIGhlaWdodD1cIjM2XCIgdmlld0JveD1cIjAgMCAxMDI0IDEwMjRcIiB2ZXJzaW9uPVwiMS4xXCJcbiAgICAgICAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgICAgPHBhdGggZmlsbD1cIiM4RDkyOUNcIlxuICAgICAgICAgICAgICAgICAgICBkPVwiTTg5NiA1MTJBMzg0IDM4NCAwIDAgMCA1MzMuMzMzMzMzIDEyOS4wNjY2NjdoLTIxLjMzMzMzM0EzODQgMzg0IDAgMCAwIDEyOS4wNjY2NjcgNDkwLjY2NjY2N3YyMS4zMzMzMzNBMzg0IDM4NCAwIDAgMCA0OTAuNjY2NjY3IDg5NmgyMS4zMzMzMzNhMzg0IDM4NCAwIDAgMCAzODQtMzYyLjY2NjY2N3YtMjEuMzMzMzMzeiBtLTg1LjMzMzMzMyAwdjEzLjAxMzMzM2ExMjggMTI4IDAgMCAxLTI0OS44MTMzMzQgMjMuODkzMzM0QTIxMy4zMzMzMzMgMjEzLjMzMzMzMyAwIDAgMCA3MjEuMDY2NjY3IDI5OC42NjY2NjcgMjk4LjY2NjY2NyAyOTguNjY2NjY3IDAgMCAxIDgxMC42NjY2NjcgNTEyek01MTIgMjEzLjMzMzMzM2gxMy4wMTMzMzNhMTI4IDEyOCAwIDAgMSAyMy44OTMzMzQgMjQ5LjgxMzMzNEEyMTMuMzMzMzMzIDIxMy4zMzMzMzMgMCAwIDAgMjk4LjY2NjY2NyAzMDIuOTMzMzMzIDI5OC42NjY2NjcgMjk4LjY2NjY2NyAwIDAgMSA1MTIgMjEzLjMzMzMzM3pNMjEzLjMzMzMzMyA1MTJ2LTEzLjAxMzMzM2ExMjggMTI4IDAgMCAxIDI0OS44MTMzMzQtMjMuODkzMzM0QTIxMy4zMzMzMzMgMjEzLjMzMzMzMyAwIDAgMCAzMDIuOTMzMzMzIDcyNS4zMzMzMzMgMjk4LjY2NjY2NyAyOTguNjY2NjY3IDAgMCAxIDIxMy4zMzMzMzMgNTEyeiBtMjk4LjY2NjY2NyAyOTguNjY2NjY3aC0xMy4wMTMzMzNhMTI4IDEyOCAwIDAgMS0yMy44OTMzMzQtMjQ5LjgxMzMzNEEyMTMuMzMzMzMzIDIxMy4zMzMzMzMgMCAwIDAgNzI1LjMzMzMzMyA3MjEuMDY2NjY3IDI5OC42NjY2NjcgMjk4LjY2NjY2NyAwIDAgMSA1MTIgODEwLjY2NjY2N3pcIiAvPlxuICAgICAgICAgICAgPC9zdmc+YDtcbiAgICBjb25zdCBtZW51VWxFbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7IC8vIOWFpeWPo+iPnOWNleWIl+ihqFxuICAgIG1lbnVVbEVsZS5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7c3R5bGUuaXRlbX1cIiBkYXRhLWlkPVwiaW1nc1wiPlxuICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzPVwiJHtzdHlsZS5pY29ufVwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMTAyNCAxMDI0XCIgdmVyc2lvbj1cIjEuMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPVwiIzhEOTI5Q1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZD1cIk04NTMuMzMzMzMzIDY4Mi42NjY2Njd2LTQyLjY2NjY2N2E0Mi42NjY2NjcgNDIuNjY2NjY3IDAgMCAwLTg1LjMzMzMzMyAwdjE3MC42NjY2NjdhNDIuNjY2NjY3IDQyLjY2NjY2NyAwIDAgMCA4NS4zMzMzMzMgMGgtNDIuNjY2NjY2di04NS4zMzMzMzRoMTI4djg1LjMzMzMzNGExMjggMTI4IDAgMCAxLTI1NiAwdi0xNzAuNjY2NjY3YTEyOCAxMjggMCAwIDEgMjU2IDB2NDIuNjY2NjY3eiBtLTUxMi04NS4zMzMzMzR2LTg1LjMzMzMzM0g4NS4zMzMzMzN2ODUuMzMzMzMzaDg1LjMzMzMzNHYyNTZIODUuMzMzMzMzdjg1LjMzMzMzNGgyNTZ2LTg1LjMzMzMzNGgtODUuMzMzMzMzVjU5Ny4zMzMzMzN6IG0yOTguNjY2NjY3LTg1LjMzMzMzM3Y0MjYuNjY2NjY3aC04NS4zMzMzMzNWNjU0LjI5MzMzM2wtNDIuNjY2NjY3IDU2Ljc0NjY2Ny00Mi42NjY2NjctNTYuNzQ2NjY3VjkzOC42NjY2NjdoLTg1LjMzMzMzM1Y1MTJoODUuMzMzMzMzbDQyLjY2NjY2NyA1Ni45Nkw1NTQuNjY2NjY3IDUxMnogbTg1LjMzMzMzMy00MjYuNjY2NjY3bDIxMy4zMzMzMzQgMjEzLjMzMzMzNHYxNzAuNjY2NjY2aC04NS4zMzMzMzR2LTEzNS4yNTMzMzNMNjg5LjkyIDE3MC42NjY2NjdIMTcwLjY2NjY2N3YyOTguNjY2NjY2SDg1LjMzMzMzM1Y4NS4zMzMzMzN6XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgICAgICAgIOWbvueJh+aWh+S7tlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHtzdHlsZS5pdGVtfVwiIGRhdGEtaWQ9XCJjc3NcIj5cbiAgICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzcz1cIiR7c3R5bGUuaWNvbn1cIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDEwMjQgMTAyNFwiIHZlcnNpb249XCIxLjFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbD1cIiM4RDkyOUNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ9XCJNNzI1LjMzMzMzMyA4NS4zMzMzMzNsMjEzLjMzMzMzNCAyMTMuMzMzMzM0djE3MC42NjY2NjZoLTg1LjMzMzMzNHYtMTM1LjI1MzMzM0w2ODkuOTIgMTcwLjY2NjY2N0gxNzAuNjY2NjY3djI5OC42NjY2NjZIODUuMzMzMzMzVjg1LjMzMzMzM3pNMjU2IDc2OHY0Mi42NjY2NjdhNDIuNjY2NjY3IDQyLjY2NjY2NyAwIDAgMS04NS4zMzMzMzMgMHYtMTcwLjY2NjY2N2E0Mi42NjY2NjcgNDIuNjY2NjY3IDAgMCAxIDg1LjMzMzMzMyAwdjQyLjY2NjY2N2g4NS4zMzMzMzN2LTQyLjY2NjY2N2ExMjggMTI4IDAgMCAwLTI1NiAwdjE3MC42NjY2NjdhMTI4IDEyOCAwIDAgMCAyNTYgMHYtNDIuNjY2NjY3eiBtMjU2LTg1LjMzMzMzM2E0Mi42NjY2NjcgNDIuNjY2NjY3IDAgMSAxIDQyLjY2NjY2Ny00Mi42NjY2NjdoODUuMzMzMzMzYTEyOCAxMjggMCAxIDAtMTI4IDEyOCA0Mi42NjY2NjcgNDIuNjY2NjY3IDAgMSAxLTQyLjY2NjY2NyA0Mi42NjY2NjdoLTg1LjMzMzMzM2ExMjggMTI4IDAgMSAwIDEyOC0xMjh6IG0yOTguNjY2NjY3IDBhNDIuNjY2NjY3IDQyLjY2NjY2NyAwIDEgMSA0Mi42NjY2NjYtNDIuNjY2NjY3aDg1LjMzMzMzNGExMjggMTI4IDAgMSAwLTEyOCAxMjggNDIuNjY2NjY3IDQyLjY2NjY2NyAwIDEgMS00Mi42NjY2NjcgNDIuNjY2NjY3aC04NS4zMzMzMzNhMTI4IDEyOCAwIDEgMCAxMjgtMTI4elwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgICBDU1Pmlofku7ZcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7c3R5bGUuaXRlbX1cIiBkYXRhLWlkPVwianNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzcz1cIiR7c3R5bGUuaWNvbn1cIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDEwMjQgMTAyNFwiIHZlcnNpb249XCIxLjFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbD1cIiM4RDkyOUNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ9XCJNOTM4LjY2NjY2NyAyOTguNjY2NjY3djY0MEg2ODIuNjY2NjY3di04NS4zMzMzMzRoMTcwLjY2NjY2NlYzMzQuMDhMNjg5LjkyIDE3MC42NjY2NjdIMTcwLjY2NjY2N3YyOTguNjY2NjY2SDg1LjMzMzMzM1Y4NS4zMzMzMzNoNjQwek01MTIgNjgyLjY2NjY2N2E0Mi42NjY2NjcgNDIuNjY2NjY3IDAgMSAxIDQyLjY2NjY2Ny00Mi42NjY2NjdoODUuMzMzMzMzYTEyOCAxMjggMCAxIDAtMTI4IDEyOCA0Mi42NjY2NjcgNDIuNjY2NjY3IDAgMSAxLTQyLjY2NjY2NyA0Mi42NjY2NjdoLTg1LjMzMzMzM2ExMjggMTI4IDAgMSAwIDEyOC0xMjh6IG0tMjU2LTE3MC42NjY2Njd2Mjk4LjY2NjY2N2E0Mi42NjY2NjcgNDIuNjY2NjY3IDAgMCAxLTg1LjMzMzMzMyAwdi00Mi42NjY2NjdIODUuMzMzMzMzdjQyLjY2NjY2N2ExMjggMTI4IDAgMCAwIDI1NiAwVjUxMnpcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICAgICAgSlPmlofku7ZcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7c3R5bGUuaXRlbX1cIiBkYXRhLWlkPVwibGlua1wiPlxuICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzPVwiJHtzdHlsZS5pY29ufVwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDQ4IDQ4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPVwiIzhEOTI5Q1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZD1cIk0xOCw0NFYzMGE2LDYsMCwwLDEsMTIsMFY0NEgyNlYzMGEyLDIsMCwwLDAtNCwwVjQ0Wk0xNiwyOFYyNEg0djRIOFY0MEg0djRIMTZWNDBIMTJWMjhaTTM0LDRINFYyMkg4VjhIMzIuMzRMNDAsMTUuNjZWMjJoNFYxNFpNMzIsMjRWNDRoNFYyNFptMTIsMEg0MEwzNiwzNGw0LDEwaDRMNDAsMzRaXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgICAgICAgIOW9k+WJjemTvuaOpVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHtzdHlsZS5pdGVtfVwiIGRhdGEtaWQ9XCJ1cmxzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3M9XCIke3N0eWxlLmljb259XCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNDggNDhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCIjOEQ5MjlDXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkPVwiTTQ0LDQwdjRIMzJWMjRoNFY0MFpNNDAsMTUuNjZWMjJoNFYxNEwzNCw0SDRWMjJIOFY4SDMyLjM0Wk0yOC4wOCwzNC4zOSwzMCw0NEgyNmwtMS42LThMMjQsMzZIMjJ2OEgxOFYyNGg2YTYsNiwwLDAsMSw0LjA4LDEwLjM5Wk0yNCwzMmEyLDIsMCwwLDAsMC00SDIydjRaTTEyLDI0VjM4YTIsMiwwLDAsMS00LDBWMjRINFYzOGE2LDYsMCwwLDAsMTIsMFYyNFpcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICAgICAg5aSa5Liq6ZO+5o6lXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2xpPlxuXG4gICAgYDtcblxuICAgIG1lbnVFbGUuYXBwZW5kQ2hpbGQoZW50cnlFbGUpO1xuICAgIG1lbnVFbGUuYXBwZW5kQ2hpbGQobWVudVVsRWxlKTtcbiAgICByZXR1cm4gbWVudUVsZTtcbn07XG5cbmlmICh3aW5kb3cuc2VsZiA9PT0gd2luZG93LnRvcCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IHh0b29sc0VsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNvbnN0IG1lbnVFbGUgPSBjcmVhdGVNZW51KCk7XG4gICAgICAgIGNvbnN0IHJlc291cmNlcyA9IGdldFJlc291cmNlcygpO1xuICAgICAgICBjb25zdCBwaWNQYW5lbEVsZSA9IGNyZWF0ZVJlc291cmNlUGFuZWwocmVzb3VyY2VzLmltZywgXCJpbWdcIik7XG4gICAgICAgIGNvbnN0IGNzc1BhbmVsRWxlID0gY3JlYXRlUmVzb3VyY2VQYW5lbChyZXNvdXJjZXMuY3NzLCBcImNzc1wiKTtcbiAgICAgICAgY29uc3QganNQYW5lbEVsZSA9IGNyZWF0ZVJlc291cmNlUGFuZWwocmVzb3VyY2VzLmpzLCBcImpzXCIpO1xuICAgICAgICBjb25zdCBpbnB1dFBhbmVsRWxlID0gY3JlYXRlSW5wdXRQYW5lbChcInVybHNcIik7XG5cbiAgICAgICAgLy8g6YGN5Y6GY2hpbGROb2Rlc++8jOenu+mZpHNob3fmoLflvI9cbiAgICAgICAgY29uc3QgY2xvc2VQYW5lbCA9IChub2RlcykgPT4ge1xuICAgICAgICAgICAgbm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIG5vZGUuY2xhc3NMaXN0LnJlbW92ZShzdHlsZS5zaG93KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIOWvueiPnOWNlemhueeahOeCueWHu+S6i+S7tui/m+ihjOebkeWQrFxuICAgICAgICB4dG9vbHNFbGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgc3dpdGNoIChlLnRhcmdldC5kYXRhc2V0LmlkKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcImltZ3NcIjpcbiAgICAgICAgICAgICAgICAgICAgLy8g6YCJ5oup5Zu+54mHXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlUGFuZWwodGhpcy5jaGlsZE5vZGVzKTtcbiAgICAgICAgICAgICAgICAgICAgcGljUGFuZWxFbGUuY2xhc3NMaXN0LmFkZChzdHlsZS5zaG93KTtcbiAgICAgICAgICAgICAgICAgICAgbGF5b3V0TWFzb25yeShcIiN4LXBhbmVsLXdhbGxcIiwgNCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJjc3NcIjpcbiAgICAgICAgICAgICAgICAgICAgLy8g6YCJ5oupY3NzXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlUGFuZWwodGhpcy5jaGlsZE5vZGVzKTtcbiAgICAgICAgICAgICAgICAgICAgY3NzUGFuZWxFbGUuY2xhc3NMaXN0LmFkZChzdHlsZS5zaG93KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImpzXCI6XG4gICAgICAgICAgICAgICAgICAgIC8vIOmAieaLqWpzXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlUGFuZWwodGhpcy5jaGlsZE5vZGVzKTtcbiAgICAgICAgICAgICAgICAgICAganNQYW5lbEVsZS5jbGFzc0xpc3QuYWRkKHN0eWxlLnNob3cpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwibGlua1wiOlxuICAgICAgICAgICAgICAgICAgICAvLyDmuIXpmaTlvZPliY1saW5rXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyQ2FjaGUoW3dpbmRvdy5sb2NhdGlvbi5ocmVmXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ1cmxzXCI6XG4gICAgICAgICAgICAgICAgICAgIGNsb3NlUGFuZWwodGhpcy5jaGlsZE5vZGVzKTtcbiAgICAgICAgICAgICAgICAgICAgLy8g6L6T5YWldXJsc1xuICAgICAgICAgICAgICAgICAgICBpbnB1dFBhbmVsRWxlLmNsYXNzTGlzdC5hZGQoc3R5bGUuc2hvdyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBcInBhbmVsLXN1Ym1pdFwiOlxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDojrflj5ZpbnB1dFBhbmVsRWxl5LitdGV4dGFyZWHnmoR2YWx1ZSDku6Xlm57ovabliIblibLmiJDmlbDnu4QgLy8g5aaC5p6cdGV4dGFyZWEg5Li656m6IOWImei/lOWbnuepuuaVsOe7hFxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5wdXRVcmxzID0gaW5wdXRQYW5lbEVsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKFwidGV4dGFyZWFcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudmFsdWUuc3BsaXQoXCJcXG5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKEJvb2xlYW4pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi54dG9vbHNFbGUucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnB1dFt0eXBlPSdjaGVja2JveCddOmNoZWNrZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBdLm1hcCgoYykgPT4gYy52YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyQ2FjaGUoWy4uLmlucHV0VXJscywgLi4uc2VsZWN0ZWRdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwicGFuZWwtY2xvc2VcIjpcbiAgICAgICAgICAgICAgICAgICAgLy8g6YGN5Y6GY2hpbGROb2Rlc++8jOenu+mZpHNob3fmoLflvI9cbiAgICAgICAgICAgICAgICAgICAgY2xvc2VQYW5lbCh0aGlzLmNoaWxkTm9kZXMpO1xuICAgICAgICAgICAgICAgICAgICAvLyDpgY3ljobmiYDmnInnmoRjaGVja2JveCzlj5bmtojpgInkuK1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRbdHlwZT1jaGVja2JveF1cIikuZm9yRWFjaChcbiAgICAgICAgICAgICAgICAgICAgICAgIChjaGVja2JveCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgLy8g5riF56m6dGV4dGFyZWHnmoTlgLxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5xdWVyeVNlbGVjdG9yKFwidGV4dGFyZWFcIikudmFsdWUgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgeHRvb2xzRWxlLmFwcGVuZENoaWxkKG1lbnVFbGUpO1xuICAgICAgICB4dG9vbHNFbGUuYXBwZW5kQ2hpbGQocGljUGFuZWxFbGUpO1xuICAgICAgICB4dG9vbHNFbGUuYXBwZW5kQ2hpbGQoY3NzUGFuZWxFbGUpO1xuICAgICAgICB4dG9vbHNFbGUuYXBwZW5kQ2hpbGQoanNQYW5lbEVsZSk7XG4gICAgICAgIHh0b29sc0VsZS5hcHBlbmRDaGlsZChpbnB1dFBhbmVsRWxlKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh4dG9vbHNFbGUpO1xuICAgIH0pO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBQUEsU0FBUyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRTtFQUMvQixFQUFFLEtBQUssR0FBRyxLQUFLLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7RUFDakMsRUFBRSxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDO0FBQzlCO0VBQ0EsRUFBRSxJQUFJLENBQUMsR0FBRyxJQUFJLE9BQU8sUUFBUSxLQUFLLFdBQVcsRUFBRSxFQUFFLE9BQU8sRUFBRTtBQUMxRDtFQUNBLEVBQUUsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdkUsRUFBRSxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0VBQzlDLEVBQUUsS0FBSyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7QUFDMUI7RUFDQSxFQUFFLElBQUksUUFBUSxLQUFLLEtBQUssRUFBRTtFQUMxQixJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtFQUN6QixNQUFNLElBQUksQ0FBQyxZQUFZLENB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
