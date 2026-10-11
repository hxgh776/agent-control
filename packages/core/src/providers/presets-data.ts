// 由 scripts/port-presets.mjs 自动生成——来源：cc-switch src/config/*ProviderPresets.ts（MIT）。
// 请勿手改；更新预设时重跑移植脚本。
import type { ProviderApp, ProviderPresetRow } from './types.js';

export const PROVIDER_PRESETS: Record<ProviderApp, ProviderPresetRow[]> = {
  "claude-code": [
    {
      "name": "Claude Official",
      "category": "official",
      "websiteUrl": "https://www.anthropic.com/claude-code",
      "settingsConfig": {
        "env": {}
      },
      "isOfficial": true
    },
    {
      "name": "Kimi",
      "category": "cn_official",
      "websiteUrl": "https://platform.kimi.com?track_id=track-7cf2b91dcde043eda6ef9a95951a042c&aff=cc-switch",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.moonshot.cn/anthropic",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "kimi-k2.7-code",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "kimi-k2.7-code",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "kimi-k2.7-code",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "kimi-k2.7-code"
        }
      },
      "isOfficial": false
    },
    {
      "name": "Kimi Global",
      "category": "cn_official",
      "websiteUrl": "https://platform.kimi.ai?track_id=track-674ed6e2af924a5682a87421f7cf753a&aff=cc-switch",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.moonshot.ai/anthropic",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "kimi-k2.7-code",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "kimi-k2.7-code",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "kimi-k2.7-code",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "kimi-k2.7-code"
        }
      },
      "isOfficial": false
    },
    {
      "name": "Kimi For Coding",
      "category": "cn_official",
      "websiteUrl": "https://www.kimi.com/code/?aff=cc-switch",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.kimi.com/coding/",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "kimi-for-coding",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "kimi-for-coding",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "kimi-for-coding",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "kimi-for-coding",
          "CLAUDE_CODE_MAX_CONTEXT_TOKENS": "262144",
          "CLAUDE_CODE_AUTO_COMPACT_WINDOW": "262144"
        }
      },
      "isOfficial": false
    },
    {
      "name": "Kimi For Coding Global",
      "category": "cn_official",
      "websiteUrl": "https://www.kimi.ai/code?aff=cc-switch",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.kimi.ai/coding/",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "kimi-for-coding",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "kimi-for-coding",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "kimi-for-coding",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "kimi-for-coding",
          "CLAUDE_CODE_MAX_CONTEXT_TOKENS": "262144",
          "CLAUDE_CODE_AUTO_COMPACT_WINDOW": "262144"
        }
      },
      "isOfficial": false
    },
    {
      "name": "PackyCode",
      "category": "third_party",
      "websiteUrl": "https://www.packyapi.ai",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://www.packyapi.ai",
          "ANTHROPIC_AUTH_TOKEN": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "ZetaAPI",
      "category": "aggregator",
      "websiteUrl": "https://zetaapi.ai",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.zetaapi.ai",
          "ANTHROPIC_AUTH_TOKEN": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "APINebula",
      "category": "third_party",
      "websiteUrl": "https://apinebula.ai",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://apinebula.ai",
          "ANTHROPIC_AUTH_TOKEN": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "AICodeMirror",
      "category": "third_party",
      "websiteUrl": "https://www.aicodemirror.ai",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.aicodemirror.ai/api/claudecode",
          "ANTHROPIC_AUTH_TOKEN": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "PatewayAI",
      "category": "third_party",
      "websiteUrl": "https://pateway.ai",
      "apiKeyField": "ANTHROPIC_API_KEY",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.pateway.ai",
          "ANTHROPIC_API_KEY": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "FennoAI",
      "category": "aggregator",
      "websiteUrl": "https://api.fenno.ai",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.fenno.ai",
          "ANTHROPIC_AUTH_TOKEN": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "RunAPI",
      "category": "aggregator",
      "websiteUrl": "https://runapi.host",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://runapi.host",
          "ANTHROPIC_AUTH_TOKEN": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "Shengsuanyun",
      "category": "aggregator",
      "websiteUrl": "https://www.shengsuanyun.com/?from=CH_4HHXMRYF",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://router.shengsuanyun.com/api",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "anthropic/claude-sonnet-5",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "anthropic/claude-haiku-4.5",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "anthropic/claude-sonnet-5",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "anthropic/claude-opus-5"
        }
      },
      "isOfficial": false
    },
    {
      "name": "AIGoCode",
      "category": "third_party",
      "websiteUrl": "https://aigocode.app",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.aigocode.app",
          "ANTHROPIC_AUTH_TOKEN": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "Qiniu",
      "category": "aggregator",
      "websiteUrl": "https://s.qiniu.com/nMvAvy",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.qnaigc.com",
          "ANTHROPIC_AUTH_TOKEN": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "AICoding",
      "category": "third_party",
      "websiteUrl": "https://aicoding.inc",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.aicoding.inc",
          "ANTHROPIC_AUTH_TOKEN": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "SubRouter",
      "category": "aggregator",
      "websiteUrl": "https://subrouter.ai",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://subrouter.ai",
          "ANTHROPIC_AUTH_TOKEN": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "FluxA Token Plan",
      "category": "aggregator",
      "websiteUrl": "https://agentmarket.fluxapay.xyz/",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.baiduqianfan.ai/anthropic/tokenplan/team",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "deepseek-v4-pro",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "deepseek-v4-pro",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "deepseek-v4-pro",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "deepseek-v4-pro"
        }
      },
      "isOfficial": false
    },
    {
      "name": "88API",
      "category": "aggregator",
      "websiteUrl": "https://88api.ai",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.88api.ai",
          "ANTHROPIC_AUTH_TOKEN": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "APIKEY.FUN",
      "category": "third_party",
      "websiteUrl": "https://apikey.fan",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.apikey.fan",
          "ANTHROPIC_AUTH_TOKEN": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "9527CODE",
      "category": "aggregator",
      "websiteUrl": "https://9527.codes",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://9527.codes",
          "ANTHROPIC_AUTH_TOKEN": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "ClaudeAPI",
      "category": "aggregator",
      "websiteUrl": "https://www.apito.ai",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://gw.apito.ai",
          "ANTHROPIC_AUTH_TOKEN": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "Code0",
      "category": "aggregator",
      "websiteUrl": "https://code0.ai",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://code0.ai",
          "ANTHROPIC_AUTH_TOKEN": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "TeamoRouter",
      "category": "aggregator",
      "websiteUrl": "https://teamorouter.cn",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.teamorouter.cn",
          "ANTHROPIC_AUTH_TOKEN": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "PPIO",
      "category": "aggregator",
      "websiteUrl": "https://ppio.com",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.ppio.com/anthropic",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "deepseek/deepseek-v4-flash-0731",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "deepseek/deepseek-v4-flash-0731",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "deepseek/deepseek-v4-flash-0731",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "deepseek/deepseek-v4-flash-0731"
        }
      },
      "isOfficial": false
    },
    {
      "name": "ClaudeCN",
      "category": "third_party",
      "websiteUrl": "https://claudecn.top",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://claudecn.top",
          "ANTHROPIC_AUTH_TOKEN": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "火山 Agent Plan",
      "category": "cn_official",
      "websiteUrl": "https://www.volcengine.com/activity/agentplan?ac=MMAP8JTTCAQ2&rc=6J6FV5N2&utm_source=OWO&utm_medium=devrel-1&utm_campaign=hw&utm_term=ccswitch&utm_content=hw",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://ark.cn-beijing.volces.com/api/plan",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "ark-code-latest",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "ark-code-latest",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "ark-code-latest",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "ark-code-latest"
        }
      },
      "isOfficial": false
    },
    {
      "name": "火山 Coding Plan",
      "category": "cn_official",
      "websiteUrl": "https://www.volcengine.com/activity/codingplan?ac=MMAP8JTTCAQ2&rc=6J6FV5N2&utm_campaign=hw&utm_content=ccswitch&utm_medium=devrel_tool_web&utm_source=OWO&utm_term=ccswitch",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://ark.cn-beijing.volces.com/api/coding",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "ark-code-latest",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "ark-code-latest",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "ark-code-latest",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "ark-code-latest"
        }
      },
      "isOfficial": false
    },
    {
      "name": "BytePlus",
      "category": "cn_official",
      "websiteUrl": "https://www.byteplus.com/en/product/modelark?utm_campaign=hw&utm_content=ccswitch&utm_medium=devrel_tool_web&utm_source=OWO&utm_term=ccswitch",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://ark.ap-southeast.bytepluses.com/api/coding",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "ark-code-latest",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "ark-code-latest",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "ark-code-latest",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "ark-code-latest"
        }
      },
      "isOfficial": false
    },
    {
      "name": "Volcengine Doubao",
      "category": "cn_official",
      "websiteUrl": "https://console.volcengine.com/ark/region:ark+cn-beijing/apiKey?apikey=%7B%7D&utm_campaign=hw&utm_content=ccswitch&utm_medium=devrel_tool_web&utm_source=OWO&utm_term=ccswitch",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://ark.cn-beijing.volces.com/api/compatible",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "doubao-seed-2-1-pro-260628",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "doubao-seed-2-1-pro-260628",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "doubao-seed-2-1-pro-260628",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "doubao-seed-2-1-pro-260628"
        }
      },
      "isOfficial": false
    },
    {
      "name": "SiliconFlow",
      "category": "aggregator",
      "websiteUrl": "https://siliconflow.cn",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.siliconflow.cn",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "Pro/MiniMaxAI/MiniMax-M2.5",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "Pro/MiniMaxAI/MiniMax-M2.5",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "Pro/MiniMaxAI/MiniMax-M2.5",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "Pro/MiniMaxAI/MiniMax-M2.5"
        }
      },
      "isOfficial": false
    },
    {
      "name": "SiliconFlow en",
      "category": "aggregator",
      "websiteUrl": "https://siliconflow.com",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.siliconflow.com",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "MiniMaxAI/MiniMax-M3",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "MiniMaxAI/MiniMax-M3",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "MiniMaxAI/MiniMax-M3",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "MiniMaxAI/MiniMax-M3"
        }
      },
      "isOfficial": false
    },
    {
      "name": "A6API",
      "category": "aggregator",
      "websiteUrl": "https://www.a6api.com",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.a6api.com",
          "ANTHROPIC_AUTH_TOKEN": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "Compshare",
      "category": "aggregator",
      "websiteUrl": "https://www.compshare.cn",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.modelverse.cn",
          "ANTHROPIC_AUTH_TOKEN": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "Compshare Coding Plan",
      "category": "aggregator",
      "websiteUrl": "https://www.compshare.cn",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://cp.compshare.cn",
          "ANTHROPIC_AUTH_TOKEN": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "CCSub",
      "category": "aggregator",
      "websiteUrl": "https://www.ccsub.net",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://www.ccsub.net",
          "ANTHROPIC_AUTH_TOKEN": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "SSSAiCode",
      "category": "third_party",
      "websiteUrl": "https://sssaicodeapi.com",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://node-hk.sssaicodeapi.com/api",
          "ANTHROPIC_AUTH_TOKEN": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "SoleAPI",
      "category": "aggregator",
      "websiteUrl": "https://soleapi.com",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://soleapi.com",
          "ANTHROPIC_AUTH_TOKEN": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "Micu",
      "category": "third_party",
      "websiteUrl": "https://www.micuapi.ai",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://www.micuapi.ai",
          "ANTHROPIC_AUTH_TOKEN": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "RightCode",
      "category": "third_party",
      "websiteUrl": "https://www.rightapi.ai",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://www.rightapi.ai/claude",
          "ANTHROPIC_AUTH_TOKEN": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "Cubence",
      "category": "third_party",
      "websiteUrl": "https://cubence.com",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.cubence.com",
          "ANTHROPIC_AUTH_TOKEN": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "CrazyRouter",
      "category": "third_party",
      "websiteUrl": "https://www.crazyrouter.com",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://cn.crazyrouter.com",
          "ANTHROPIC_AUTH_TOKEN": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "DMXAPI",
      "category": "aggregator",
      "websiteUrl": "https://www.dmxapi.cn",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://www.dmxapi.cn",
          "ANTHROPIC_AUTH_TOKEN": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "SudoCode.chat",
      "category": "third_party",
      "websiteUrl": "https://sudocode.chat",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.sudocode.chat",
          "ANTHROPIC_AUTH_TOKEN": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "SudoCode.us",
      "category": "third_party",
      "websiteUrl": "https://sudocode.us",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://sudocode.us",
          "ANTHROPIC_AUTH_TOKEN": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "XycAi",
      "category": "aggregator",
      "websiteUrl": "https://xycai.us",
      "apiKeyField": "ANTHROPIC_API_KEY",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://apicdn.xycai.us",
          "ANTHROPIC_API_KEY": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "Tu-zi",
      "category": "aggregator",
      "websiteUrl": "https://api.tu-zi.com",
      "apiKeyField": "ANTHROPIC_API_KEY",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.tu-zi.com",
          "ANTHROPIC_API_KEY": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "Amux",
      "category": "aggregator",
      "websiteUrl": "https://amux.ai",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.amux.ai",
          "ANTHROPIC_AUTH_TOKEN": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "AtlasCloud",
      "category": "aggregator",
      "websiteUrl": "https://www.atlascloud.ai/console/coding-plan",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.atlascloud.ai",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "zai-org/glm-5.1",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "zai-org/glm-5.1",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "zai-org/glm-5.1",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "zai-org/glm-5.1",
          "CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS": "1"
        }
      },
      "isOfficial": false
    },
    {
      "name": "Soshow",
      "category": "aggregator",
      "websiteUrl": "https://aimarket.so-show.com",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://maas.so-show.com",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "claude-sonnet-5",
          "CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS": "1"
        }
      },
      "isOfficial": false
    },
    {
      "name": "Gemini Native",
      "category": "third_party",
      "websiteUrl": "https://ai.google.dev/gemini-api",
      "apiKeyField": "ANTHROPIC_API_KEY",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://generativelanguage.googleapis.com",
          "ANTHROPIC_API_KEY": "",
          "ANTHROPIC_MODEL": "gemini-3.6-flash",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "gemini-3.6-flash",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "gemini-3.6-flash",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "gemini-3.6-flash"
        }
      },
      "isOfficial": false
    },
    {
      "name": "DeepSeek",
      "category": "cn_official",
      "websiteUrl": "https://platform.deepseek.com",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.deepseek.com/anthropic",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "deepseek-v4-pro",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "deepseek-flash",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "deepseek-v4-pro",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "deepseek-v4-pro"
        }
      },
      "isOfficial": false
    },
    {
      "name": "OpenCode Go",
      "category": "third_party",
      "websiteUrl": "https://opencode.ai/go",
      "apiKeyField": "ANTHROPIC_API_KEY",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://opencode.ai/zen/go",
          "ANTHROPIC_API_KEY": "",
          "ANTHROPIC_MODEL": "deepseek-v4-flash",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "deepseek-v4-flash",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "deepseek-v4-flash",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "deepseek-v4-flash"
        }
      },
      "isOfficial": false
    },
    {
      "name": "OpenCode Zen",
      "category": "aggregator",
      "websiteUrl": "https://opencode.ai/zen",
      "apiKeyField": "ANTHROPIC_API_KEY",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://opencode.ai/zen",
          "ANTHROPIC_API_KEY": "",
          "ANTHROPIC_MODEL": "claude-sonnet-5-5",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "claude-haiku-4-5",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "claude-sonnet-5-5",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "claude-opus-5-5"
        }
      },
      "isOfficial": false
    },
    {
      "name": "Tencent Token Plan",
      "category": "cn_official",
      "websiteUrl": "https://cloud.tencent.com/product/tokenhub",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.lkeap.cloud.tencent.com/plan/anthropic",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "tc-code-latest",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "tc-code-latest",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "tc-code-latest",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "tc-code-latest"
        }
      },
      "isOfficial": false
    },
    {
      "name": "Tencent Token Plan (Intl)",
      "category": "cn_official",
      "websiteUrl": "https://www.tencentcloud.com/products/tokenhub",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://tokenhub-intl.tencentcloudmaas.com/plan/anthropic",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "auto",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "auto",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "auto",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "auto"
        }
      },
      "isOfficial": false
    },
    {
      "name": "Tencent Token Plan Enterprise Pro",
      "category": "cn_official",
      "websiteUrl": "https://cloud.tencent.com/product/tokenhub",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://tokenhub.tencentmaas.com/plan/anthropic",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "auto",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "auto",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "auto",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "auto"
        }
      },
      "isOfficial": false
    },
    {
      "name": "Tencent Token Plan Enterprise Pro (Intl)",
      "category": "cn_official",
      "websiteUrl": "https://www.tencentcloud.com/products/tokenhub",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://tokenhub-intl.tencentcloudmaas.com/plan/anthropic",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "auto",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "auto",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "auto",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "auto"
        }
      },
      "isOfficial": false
    },
    {
      "name": "Tencent Token Plan Enterprise Lite",
      "category": "cn_official",
      "websiteUrl": "https://cloud.tencent.com/product/tokenhub",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://tokenhub.tencentmaas.com/plan/anthropic",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "auto",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "auto",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "auto",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "auto"
        }
      },
      "isOfficial": false
    },
    {
      "name": "Tencent Token Plan Enterprise Lite (Intl)",
      "category": "cn_official",
      "websiteUrl": "https://www.tencentcloud.com/products/tokenhub",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://tokenhub-intl.tencentcloudmaas.com/plan/anthropic",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "auto",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "auto",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "auto",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "auto"
        }
      },
      "isOfficial": false
    },
    {
      "name": "Zhipu GLM",
      "category": "cn_official",
      "websiteUrl": "https://open.bigmodel.cn",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://open.bigmodel.cn/api/anthropic",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "glm-5.3",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "glm-5.3",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "glm-5.3",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "glm-5.3"
        }
      },
      "isOfficial": false
    },
    {
      "name": "Zhipu GLM en",
      "category": "cn_official",
      "websiteUrl": "https://z.ai",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.z.ai/api/anthropic",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "glm-5.3",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "glm-5.3",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "glm-5.3",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "glm-5.3"
        }
      },
      "isOfficial": false
    },
    {
      "name": "Baidu Qianfan Coding Plan",
      "category": "cn_official",
      "websiteUrl": "https://cloud.baidu.com/product/qianfan_modelbuilder",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://qianfan.baidubce.com/anthropic/coding",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "qianfan-code-latest",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "qianfan-code-latest",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "qianfan-code-latest",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "qianfan-code-latest"
        }
      },
      "isOfficial": false
    },
    {
      "name": "Baidu Qianfan Token Plan",
      "category": "cn_official",
      "websiteUrl": "https://cloud.baidu.com/product/codingplan.html",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://qianfan.baidubce.com/anthropic/tokenplan/personal",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "deepseek-v4-pro",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "deepseek-v4-pro",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "deepseek-v4-pro",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "deepseek-v4-pro"
        }
      },
      "isOfficial": false
    },
    {
      "name": "千问AI平台",
      "category": "cn_official",
      "websiteUrl": "https://platform.qianwenai.com/?utm_content=g_20000002971",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://dashscope.aliyuncs.com/apps/anthropic",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "qwen3.8-max",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "qwen3.8-flash",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "qwen3.7-plus",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "qwen3.8-max",
          "CLAUDE_CODE_MAX_CONTEXT_TOKENS": "983616"
        }
      },
      "isOfficial": false
    },
    {
      "name": "千问AI平台 Coding Plan",
      "category": "cn_official",
      "websiteUrl": "https://bailian.console.aliyun.com",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://coding.dashscope.aliyuncs.com/apps/anthropic",
          "ANTHROPIC_AUTH_TOKEN": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "千问AI平台 Token Plan",
      "category": "cn_official",
      "websiteUrl": "https://platform.qianwenai.com/pricing/token-plan?utm_content=g_20000002977",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://token-plan.cn-beijing.maas.aliyuncs.com/apps/anthropic",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "qwen3.8-max",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "qwen3.8-flash",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "qwen3.7-plus",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "qwen3.8-max",
          "CLAUDE_CODE_MAX_CONTEXT_TOKENS": "983616"
        }
      },
      "isOfficial": false
    },
    {
      "name": "QwenCloud",
      "category": "cn_official",
      "websiteUrl": "https://home.qwencloud.com/?utm_content=g_20000002974",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://dashscope-intl.aliyuncs.com/apps/anthropic",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "qwen3.8-max",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "qwen3.8-flash",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "qwen3.7-plus",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "qwen3.8-max"
        }
      },
      "isOfficial": false
    },
    {
      "name": "QwenCloud For Coding",
      "category": "cn_official",
      "websiteUrl": "https://www.qwencloud.com",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://coding-intl.dashscope.aliyuncs.com/apps/anthropic",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "qwen3.7-plus",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "qwen3.7-plus",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "qwen3.7-plus",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "qwen3.7-plus"
        }
      },
      "isOfficial": false
    },
    {
      "name": "QwenCloud Token Plan",
      "category": "cn_official",
      "websiteUrl": "https://www.qwencloud.com/pricing/token-plan?utm_content=g_20000002980",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://token-plan.ap-southeast-1.maas.aliyuncs.com/apps/anthropic",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "qwen3.8-max",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "qwen3.8-flash",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "qwen3.7-plus",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "qwen3.8-max",
          "CLAUDE_CODE_MAX_CONTEXT_TOKENS": "983616"
        }
      },
      "isOfficial": false
    },
    {
      "name": "StepFun",
      "category": "cn_official",
      "websiteUrl": "https://platform.stepfun.com/step-plan",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.stepfun.com/step_plan",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "step-3.5-flash-2603",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "step-3.5-flash-2603",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "step-3.5-flash-2603",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "step-3.5-flash-2603"
        }
      },
      "isOfficial": false
    },
    {
      "name": "StepFun en",
      "category": "cn_official",
      "websiteUrl": "https://platform.stepfun.ai/step-plan",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.stepfun.ai/step_plan",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "step-3.5-flash-2603",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "step-3.5-flash-2603",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "step-3.5-flash-2603",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "step-3.5-flash-2603"
        }
      },
      "isOfficial": false
    },
    {
      "name": "ModelScope",
      "category": "aggregator",
      "websiteUrl": "https://modelscope.cn",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api-inference.modelscope.cn",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "ZhipuAI/GLM-5.2",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "ZhipuAI/GLM-5.2",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "ZhipuAI/GLM-5.2",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "ZhipuAI/GLM-5.2"
        }
      },
      "isOfficial": false
    },
    {
      "name": "KAT-Coder",
      "category": "cn_official",
      "websiteUrl": "https://console.streamlake.ai",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://vanchin.streamlake.ai/api/gateway/v1/endpoints/${ENDPOINT_ID}/claude-code-proxy",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "KAT-Coder-Pro V1",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "KAT-Coder-Air V1",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "KAT-Coder-Pro V1",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "KAT-Coder-Pro V1"
        }
      },
      "isOfficial": false
    },
    {
      "name": "Longcat",
      "category": "cn_official",
      "websiteUrl": "https://longcat.chat/platform",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.longcat.chat/anthropic",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "LongCat-2.0",
          "ANTHROPIC_SMALL_FAST_MODEL": "LongCat-2.0",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "LongCat-2.0",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "LongCat-2.0",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "LongCat-2.0",
          "CLAUDE_CODE_MAX_OUTPUT_TOKENS": "131072"
        }
      },
      "isOfficial": false
    },
    {
      "name": "MiniMax",
      "category": "cn_official",
      "websiteUrl": "https://platform.minimax.cn",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.minimax.cn/anthropic",
          "ANTHROPIC_AUTH_TOKEN": "",
          "CLAUDE_CODE_AUTO_COMPACT_WINDOW": "1000000",
          "ANTHROPIC_MODEL": "MiniMax-M3[1M]",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "MiniMax-M3[1M]",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "MiniMax-M3[1M]",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "MiniMax-M3[1M]"
        }
      },
      "isOfficial": false
    },
    {
      "name": "MiniMax en",
      "category": "cn_official",
      "websiteUrl": "https://platform.minimax.io",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.minimax.io/anthropic",
          "ANTHROPIC_AUTH_TOKEN": "",
          "CLAUDE_CODE_AUTO_COMPACT_WINDOW": "1000000",
          "ANTHROPIC_MODEL": "MiniMax-M3[1M]",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "MiniMax-M3[1M]",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "MiniMax-M3[1M]",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "MiniMax-M3[1M]"
        }
      },
      "isOfficial": false
    },
    {
      "name": "BaiLing",
      "category": "cn_official",
      "websiteUrl": "https://developer.ant-ling.com/zh-CN/docs/",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.ant-ling.com/anthropic",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "Ling-2.6-1T",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "Ling-2.6-1T",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "Ling-2.6-1T",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "Ling-2.6-1T"
        }
      },
      "isOfficial": false
    },
    {
      "name": "AiHubMix",
      "category": "aggregator",
      "websiteUrl": "https://aihubmix.com",
      "apiKeyField": "ANTHROPIC_API_KEY",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://aihubmix.com",
          "ANTHROPIC_API_KEY": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "CherryIN",
      "category": "aggregator",
      "websiteUrl": "https://open.cherryin.ai",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://open.cherryin.net",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "anthropic/claude-sonnet-5",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "anthropic/claude-haiku-4.5",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "anthropic/claude-sonnet-5",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "anthropic/claude-opus-5"
        }
      },
      "isOfficial": false
    },
    {
      "name": "RelaxyCode",
      "category": "third_party",
      "websiteUrl": "https://www.relaxycode.com",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://www.relaxycode.com",
          "ANTHROPIC_AUTH_TOKEN": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "E-FlowCode",
      "category": "third_party",
      "websiteUrl": "https://e-flowcode.cc",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_BASE_URL": "https://e-flowcode.cc",
          "ENABLE_TOOL_SEARCH": "true"
        }
      },
      "isOfficial": false
    },
    {
      "name": "OpenRouter",
      "category": "aggregator",
      "websiteUrl": "https://openrouter.ai",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://openrouter.ai/api",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "anthropic/claude-sonnet-5",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "anthropic/claude-haiku-4.5",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "anthropic/claude-sonnet-5",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "anthropic/claude-opus-5"
        }
      },
      "isOfficial": false
    },
    {
      "name": "TheRouter",
      "category": "aggregator",
      "websiteUrl": "https://therouter.ai",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.therouter.ai",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_API_KEY": "",
          "ANTHROPIC_MODEL": "anthropic/claude-sonnet-5",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "anthropic/claude-haiku-4.5",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "anthropic/claude-sonnet-5",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "anthropic/claude-opus-5"
        }
      },
      "isOfficial": false
    },
    {
      "name": "Novita AI",
      "category": "aggregator",
      "websiteUrl": "https://novita.ai",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.novita.ai/anthropic",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "zai-org/glm-5.1",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "zai-org/glm-5.1",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "zai-org/glm-5.1",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "zai-org/glm-5.1"
        }
      },
      "isOfficial": false
    },
    {
      "name": "GitHub Copilot",
      "category": "third_party",
      "websiteUrl": "https://github.com/features/copilot",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.githubcopilot.com",
          "ANTHROPIC_MODEL": "claude-sonnet-5",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "claude-haiku-4.5",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "claude-sonnet-5",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "claude-sonnet-5"
        }
      },
      "isOfficial": false
    },
    {
      "name": "Codex",
      "category": "third_party",
      "websiteUrl": "https://openai.com/chatgpt/pricing",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://chatgpt.com/backend-api/codex",
          "ANTHROPIC_MODEL": "gpt-5.6-sol",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "gpt-5.6-luna",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "gpt-5.6-sol",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "gpt-5.6-sol",
          "CLAUDE_CODE_MAX_CONTEXT_TOKENS": "372000",
          "CLAUDE_CODE_AUTO_COMPACT_WINDOW": "372000"
        }
      },
      "isOfficial": false
    },
    {
      "name": "xAI (Grok)",
      "category": "third_party",
      "websiteUrl": "https://x.ai/grok",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.x.ai/v1",
          "ANTHROPIC_MODEL": "grok-4.5",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "grok-4.5",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "grok-4.5",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "grok-4.5"
        }
      },
      "isOfficial": false
    },
    {
      "name": "Nvidia",
      "category": "aggregator",
      "websiteUrl": "https://build.nvidia.com",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://integrate.api.nvidia.com",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "moonshotai/kimi-k3",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "moonshotai/kimi-k3",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "moonshotai/kimi-k3",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "moonshotai/kimi-k3"
        }
      },
      "isOfficial": false
    },
    {
      "name": "PIPELLM",
      "category": "aggregator",
      "websiteUrl": "https://code.pipellm.ai",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://cc-api.pipellm.ai",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "claude-opus-5",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "claude-haiku-4-5-20251001",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "claude-sonnet-5",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "claude-opus-5"
        }
      },
      "isOfficial": false
    },
    {
      "name": "Xiaomi MiMo",
      "category": "cn_official",
      "websiteUrl": "https://platform.xiaomimimo.com",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.xiaomimimo.com/anthropic",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "mimo-v2.6-pro",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "mimo-v2.6-pro",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "mimo-v2.6-pro",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "mimo-v2.6-pro"
        }
      },
      "isOfficial": false
    },
    {
      "name": "Xiaomi MiMo Token Plan (China)",
      "category": "cn_official",
      "websiteUrl": "https://platform.xiaomimimo.com/#/token-plan",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://token-plan-cn.xiaomimimo.com/anthropic",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "mimo-v2.6-pro",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "mimo-v2.6-pro",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "mimo-v2.6-pro",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "mimo-v2.6-pro"
        }
      },
      "isOfficial": false
    },
    {
      "name": "AWS Bedrock (AKSK)",
      "category": "cloud_provider",
      "websiteUrl": "https://aws.amazon.com/bedrock/",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://bedrock-runtime.${AWS_REGION}.amazonaws.com",
          "AWS_ACCESS_KEY_ID": "${AWS_ACCESS_KEY_ID}",
          "AWS_SECRET_ACCESS_KEY": "${AWS_SECRET_ACCESS_KEY}",
          "AWS_REGION": "${AWS_REGION}",
          "ANTHROPIC_MODEL": "global.anthropic.claude-opus-5",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "global.anthropic.claude-haiku-4-5-20251001-v1:0",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "global.anthropic.claude-sonnet-5",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "global.anthropic.claude-opus-5",
          "CLAUDE_CODE_USE_BEDROCK": "1"
        }
      },
      "isOfficial": false
    },
    {
      "name": "AWS Bedrock (API Key)",
      "category": "cloud_provider",
      "websiteUrl": "https://aws.amazon.com/bedrock/",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://bedrock-runtime.${AWS_REGION}.amazonaws.com",
          "AWS_BEARER_TOKEN_BEDROCK": "",
          "AWS_REGION": "${AWS_REGION}",
          "ANTHROPIC_MODEL": "global.anthropic.claude-opus-5",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "global.anthropic.claude-haiku-4-5-20251001-v1:0",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "global.anthropic.claude-sonnet-5",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "global.anthropic.claude-opus-5",
          "CLAUDE_CODE_USE_BEDROCK": "1"
        }
      },
      "isOfficial": false
    },
    {
      "name": "JieKou AI",
      "category": "aggregator",
      "websiteUrl": "https://jiekou.ai/#model-library",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.jiekou.ai/anthropic",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "claude-fable-5",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "claude-fable-5",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "claude-fable-5",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "claude-fable-5"
        }
      },
      "isOfficial": false
    },
    {
      "name": "AICodeWith",
      "category": "aggregator",
      "websiteUrl": "https://aicodewith.ai",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.aicodewith.ai",
          "ANTHROPIC_AUTH_TOKEN": ""
        }
      },
      "isOfficial": false
    },
    {
      "name": "Command Code",
      "category": "third_party",
      "websiteUrl": "https://commandcode.ai",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://api.commandcode.ai/provider",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "deepseek/deepseek-v4.1-flash",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "deepseek/deepseek-v4.1-flash",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "deepseek/deepseek-v4.1-flash",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "deepseek/deepseek-v4.1-flash"
        }
      },
      "isOfficial": false
    },
    {
      "name": "模力方舟",
      "category": "aggregator",
      "websiteUrl": "https://moark.com",
      "settingsConfig": {
        "env": {
          "ANTHROPIC_BASE_URL": "https://moark.com/anthropic",
          "ANTHROPIC_AUTH_TOKEN": "",
          "ANTHROPIC_MODEL": "deepseek-v4-flash-0731",
          "ANTHROPIC_DEFAULT_HAIKU_MODEL": "deepseek-v4-flash-0731",
          "ANTHROPIC_DEFAULT_SONNET_MODEL": "deepseek-v4-flash-0731",
          "ANTHROPIC_DEFAULT_OPUS_MODEL": "deepseek-v4-flash-0731"
        }
      },
      "isOfficial": false
    }
  ],
  "codex": [
    {
      "name": "OpenAI Official",
      "category": "official",
      "websiteUrl": "https://chatgpt.com/codex",
      "auth": {},
      "config": "",
      "isOfficial": true
    },
    {
      "name": "GitHub Copilot",
      "category": "third_party",
      "websiteUrl": "https://github.com/features/copilot",
      "auth": {},
      "config": "model_provider = \"custom\"\nmodel = \"gpt-6-astra\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"github-copilot\"\nbase_url = \"https://api.githubcopilot.com\"\nwire_api = \"responses\"\nrequires_openai_auth = false",
      "isOfficial": false
    },
    {
      "name": "Kimi",
      "category": "cn_official",
      "websiteUrl": "https://platform.kimi.com?track_id=track-7cf2b91dcde043eda6ef9a95951a042c&aff=cc-switch",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"kimi-k3\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"kimi\"\nbase_url = \"https://api.moonshot.cn/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "Kimi Global",
      "category": "cn_official",
      "websiteUrl": "https://platform.kimi.ai?track_id=track-674ed6e2af924a5682a87421f7cf753a&aff=cc-switch",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"kimi-k3\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"kimi\"\nbase_url = \"https://api.moonshot.ai/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "Kimi For Coding",
      "category": "cn_official",
      "websiteUrl": "https://www.kimi.com/code/?aff=cc-switch",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"kimi-for-coding\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"kimi_coding\"\nbase_url = \"https://api.kimi.com/coding/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "Kimi For Coding Global",
      "category": "cn_official",
      "websiteUrl": "https://www.kimi.ai/code?aff=cc-switch",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"kimi-for-coding\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"kimi_coding\"\nbase_url = \"https://api.kimi.ai/coding/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "PackyCode",
      "category": "third_party",
      "websiteUrl": "https://www.packyapi.ai",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"packycode\"\nbase_url = \"https://www.packyapi.ai/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "ZetaAPI",
      "category": "aggregator",
      "websiteUrl": "https://zetaapi.ai",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"zetaapi\"\nbase_url = \"https://api.zetaapi.ai/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "APINebula",
      "category": "third_party",
      "websiteUrl": "https://apinebula.ai",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nreview_model = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"APINebula\"\nbase_url = \"https://apinebula.ai/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "AICodeMirror",
      "websiteUrl": "https://www.aicodemirror.ai",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"aicodemirror\"\nbase_url = \"https://api.aicodemirror.ai/api/codex/backend-api/codex\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "PatewayAI",
      "category": "third_party",
      "websiteUrl": "https://pateway.ai",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"patewayai\"\nbase_url = \"https://api.pateway.ai/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "FennoAI",
      "category": "aggregator",
      "websiteUrl": "https://api.fenno.ai",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"fenno\"\nbase_url = \"https://api.fenno.ai\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "RunAPI",
      "category": "aggregator",
      "websiteUrl": "https://runapi.host",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"runapi\"\nbase_url = \"https://runapi.host/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "Shengsuanyun",
      "category": "aggregator",
      "websiteUrl": "https://www.shengsuanyun.com/?from=CH_4HHXMRYF",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"openai/gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"shengsuanyun\"\nbase_url = \"https://router.shengsuanyun.com/api/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "AIGoCode",
      "category": "third_party",
      "websiteUrl": "https://aigocode.app",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"aigocode\"\nbase_url = \"https://api.aigocode.app\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "Qiniu",
      "category": "aggregator",
      "websiteUrl": "https://s.qiniu.com/nMvAvy",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-6-astra\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"qiniu\"\nbase_url = \"https://api.qnaigc.com/bypass/openai/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "AICoding",
      "websiteUrl": "https://aicoding.inc",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"aicoding\"\nbase_url = \"https://api.aicoding.inc\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "SubRouter",
      "category": "aggregator",
      "websiteUrl": "https://subrouter.ai",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"subrouter\"\nbase_url = \"https://subrouter.ai/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "FluxA Token Plan",
      "category": "aggregator",
      "websiteUrl": "https://agentmarket.fluxapay.xyz/",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"deepseek-v4-pro\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"fluxa_tokenplan\"\nbase_url = \"https://api.baiduqianfan.ai/v2/tokenplan/team\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "88API",
      "category": "aggregator",
      "websiteUrl": "https://88api.ai",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"88api\"\nbase_url = \"https://api.88api.ai/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "APIKEY.FUN",
      "category": "third_party",
      "websiteUrl": "https://apikey.fan",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nreview_model = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"APIKEY.FUN\"\nbase_url = \"https://api.apikey.fan/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "9527CODE",
      "category": "aggregator",
      "websiteUrl": "https://9527.codes",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"9527code\"\nbase_url = \"https://9527.codes/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "Code0",
      "category": "aggregator",
      "websiteUrl": "https://code0.ai",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"code0\"\nbase_url = \"https://code0.ai/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "TeamoRouter",
      "category": "aggregator",
      "websiteUrl": "https://teamorouter.cn",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"teamorouter\"\nbase_url = \"https://api.teamorouter.cn/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "PPIO",
      "category": "aggregator",
      "websiteUrl": "https://ppio.com",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"deepseek/deepseek-v4-flash-0731\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"ppio\"\nbase_url = \"https://api.ppio.com/openai/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "ClaudeCN",
      "category": "third_party",
      "websiteUrl": "https://claudecn.top",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"claudecn\"\nbase_url = \"https://claudecn.top/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "火山 Agent Plan",
      "category": "cn_official",
      "websiteUrl": "https://www.volcengine.com/activity/agentplan?ac=MMAP8JTTCAQ2&rc=6J6FV5N2&utm_source=OWO&utm_medium=devrel-1&utm_campaign=hw&utm_term=ccswitch&utm_content=hw",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"ark-code-latest\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"ark_agentplan\"\nbase_url = \"https://ark.cn-beijing.volces.com/api/plan/v3\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "火山 Coding Plan",
      "category": "cn_official",
      "websiteUrl": "https://www.volcengine.com/activity/codingplan?ac=MMAP8JTTCAQ2&rc=6J6FV5N2&utm_campaign=hw&utm_content=ccswitch&utm_medium=devrel_tool_web&utm_source=OWO&utm_term=ccswitch",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"ark-code-latest\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"ark_codingplan\"\nbase_url = \"https://ark.cn-beijing.volces.com/api/coding/v3\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "BytePlus",
      "category": "cn_official",
      "websiteUrl": "https://www.byteplus.com/en/product/modelark?utm_campaign=hw&utm_content=ccswitch&utm_medium=devrel_tool_web&utm_source=OWO&utm_term=ccswitch",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"ark-code-latest\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"byteplus\"\nbase_url = \"https://ark.ap-southeast.bytepluses.com/api/coding/v3\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "Volcengine Doubao",
      "category": "cn_official",
      "websiteUrl": "https://console.volcengine.com/ark/region:ark+cn-beijing/apiKey?apikey=%7B%7D&utm_campaign=hw&utm_content=ccswitch&utm_medium=devrel_tool_web&utm_source=OWO&utm_term=ccswitch",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"doubao-seed-2-1-pro-260628\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"doubaoseed\"\nbase_url = \"https://ark.cn-beijing.volces.com/api/v3\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "SiliconFlow",
      "category": "aggregator",
      "websiteUrl": "https://siliconflow.cn",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"deepseek-ai/DeepSeek-V4-Flash\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"siliconflow\"\nbase_url = \"https://api.siliconflow.cn/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "SiliconFlow en",
      "category": "aggregator",
      "websiteUrl": "https://siliconflow.com",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"MiniMaxAI/MiniMax-M3\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"siliconflow_en\"\nbase_url = \"https://api.siliconflow.com/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "A6API",
      "category": "aggregator",
      "websiteUrl": "https://www.a6api.com",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"a6api\"\nbase_url = \"https://api.a6api.com/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "Compshare",
      "category": "aggregator",
      "websiteUrl": "https://www.compshare.cn",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-6-astra\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"compshare\"\nbase_url = \"https://api.modelverse.cn/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "Compshare Coding Plan",
      "category": "aggregator",
      "websiteUrl": "https://www.compshare.cn",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"compshare_coding\"\nbase_url = \"https://cp.compshare.cn/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "CCSub",
      "category": "aggregator",
      "websiteUrl": "https://www.ccsub.net",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-6-astra\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"ccsub\"\nbase_url = \"https://www.ccsub.net/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "SSSAiCode",
      "category": "third_party",
      "websiteUrl": "https://sssaicodeapi.com",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"sssaicode\"\nbase_url = \"https://node-hk.sssaicodeapi.com/api/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "SoleAPI",
      "category": "aggregator",
      "websiteUrl": "https://soleapi.com",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"soleapi\"\nbase_url = \"https://soleapi.com/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "Micu",
      "category": "third_party",
      "websiteUrl": "https://www.micuapi.ai",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"micu\"\nbase_url = \"https://www.micuapi.ai/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "RightCode",
      "category": "third_party",
      "websiteUrl": "https://www.rightapi.ai",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"rightcode\"\nbase_url = \"https://www.rightapi.ai/codex/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "Cubence",
      "category": "third_party",
      "websiteUrl": "https://cubence.com",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"cubence\"\nbase_url = \"https://api.cubence.com/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "CrazyRouter",
      "websiteUrl": "https://www.crazyrouter.com",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"crazyrouter\"\nbase_url = \"https://cn.crazyrouter.com/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "DMXAPI",
      "category": "aggregator",
      "websiteUrl": "https://www.dmxapi.cn",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"dmxapi\"\nbase_url = \"https://www.dmxapi.cn/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "SudoCode.chat",
      "category": "third_party",
      "websiteUrl": "https://sudocode.chat",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nreview_model = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"SudoCode\"\nbase_url = \"https://api.sudocode.chat/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "SudoCode.us",
      "category": "third_party",
      "websiteUrl": "https://sudocode.us",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nreview_model = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\nmodel_verbosity = \"high\"\n\n[model_providers.custom]\nname = \"sudocode\"\nbase_url = \"https://sudocode.us/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "XycAi",
      "category": "aggregator",
      "websiteUrl": "https://xycai.us",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"xycai\"\nbase_url = \"https://apicdn.xycai.us/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "Tu-zi",
      "category": "aggregator",
      "websiteUrl": "https://api.tu-zi.com",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"tuzi\"\nbase_url = \"https://api.tu-zi.com/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "Amux",
      "category": "aggregator",
      "websiteUrl": "https://amux.ai",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"amux\"\nbase_url = \"https://api.amux.ai/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "AtlasCloud",
      "category": "aggregator",
      "websiteUrl": "https://www.atlascloud.ai/console/coding-plan",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"zai-org/glm-5.2\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"AtlasCloud\"\nbase_url = \"https://api.atlascloud.ai/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "Soshow",
      "category": "aggregator",
      "websiteUrl": "https://aimarket.so-show.com",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"soshow\"\nbase_url = \"https://maas.so-show.com/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "Azure OpenAI",
      "category": "third_party",
      "websiteUrl": "https://learn.microsoft.com/en-us/azure/ai-foundry/openai/how-to/codex",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"Azure OpenAI\"\nbase_url = \"https://YOUR_RESOURCE_NAME.openai.azure.com/openai\"\nenv_key = \"OPENAI_API_KEY\"\nquery_params = { \"api-version\" = \"2025-04-01-preview\" }\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": true
    },
    {
      "name": "DeepSeek",
      "category": "cn_official",
      "websiteUrl": "https://platform.deepseek.com",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"deepseek-flash\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"deepseek\"\nbase_url = \"https://api.deepseek.com\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "Zhipu GLM",
      "category": "cn_official",
      "websiteUrl": "https://open.bigmodel.cn",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"glm-5.3\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"zhipu_glm\"\nbase_url = \"https://open.bigmodel.cn/api/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "Zhipu GLM en",
      "category": "cn_official",
      "websiteUrl": "https://z.ai",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"glm-5.3\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"zhipu_glm_en\"\nbase_url = \"https://api.z.ai/api/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "Baidu Qianfan",
      "category": "cn_official",
      "websiteUrl": "https://cloud.baidu.com/product/qianfan_modelbuilder",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"deepseek-v4-pro\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"qianfan\"\nbase_url = \"https://qianfan.baidubce.com/v2\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "Baidu Qianfan Coding Plan",
      "category": "cn_official",
      "websiteUrl": "https://cloud.baidu.com/product/qianfan_modelbuilder",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"qianfan-code-latest\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"qianfan_coding\"\nbase_url = \"https://qianfan.baidubce.com/v2/coding\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "Baidu Qianfan Token Plan",
      "category": "cn_official",
      "websiteUrl": "https://cloud.baidu.com/product/codingplan.html",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"deepseek-v4-pro\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"qianfan_tokenplan\"\nbase_url = \"https://qianfan.baidubce.com/v2/tokenplan/personal\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "千问AI平台",
      "category": "cn_official",
      "websiteUrl": "https://platform.qianwenai.com/?utm_content=g_20000002971",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"qwen3.8-max\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"qianwenai\"\nbase_url = \"https://dashscope.aliyuncs.com/compatible-mode/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "千问AI平台 Token Plan",
      "category": "cn_official",
      "websiteUrl": "https://platform.qianwenai.com/pricing/token-plan?utm_content=g_20000002977",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"qwen3.8-max\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"qianwenai_token_plan\"\nbase_url = \"https://token-plan.cn-beijing.maas.aliyuncs.com/compatible-mode/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "QwenCloud",
      "category": "cn_official",
      "websiteUrl": "https://home.qwencloud.com/?utm_content=g_20000002974",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"qwen3.8-max\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"qwencloud\"\nbase_url = \"https://dashscope-intl.aliyuncs.com/compatible-mode/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "QwenCloud For Coding",
      "category": "cn_official",
      "websiteUrl": "https://www.qwencloud.com",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"qwen3.7-plus\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"qwencloud_coding\"\nbase_url = \"https://coding-intl.dashscope.aliyuncs.com/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "QwenCloud Token Plan",
      "category": "cn_official",
      "websiteUrl": "https://www.qwencloud.com/pricing/token-plan?utm_content=g_20000002980",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"qwen3.8-max\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"qwencloud_token_plan\"\nbase_url = \"https://token-plan.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "Tencent Hunyuan",
      "category": "cn_official",
      "websiteUrl": "https://cloud.tencent.com/product/tokenhub",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"hy3\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"hy3_tokenhub\"\nbase_url = \"https://tokenhub.tencentmaas.com/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "Tencent Token Plan",
      "category": "cn_official",
      "websiteUrl": "https://cloud.tencent.com/product/tokenhub",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"tc-code-latest\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"tencent_token_plan\"\nbase_url = \"https://api.lkeap.cloud.tencent.com/plan/v3\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "Tencent Token Plan (Intl)",
      "category": "cn_official",
      "websiteUrl": "https://www.tencentcloud.com/products/tokenhub",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"auto\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"tencent_token_plan_intl\"\nbase_url = \"https://tokenhub-intl.tencentcloudmaas.com/plan/v3\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "Tencent Token Plan Enterprise Pro",
      "category": "cn_official",
      "websiteUrl": "https://cloud.tencent.com/product/tokenhub",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"auto\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"tencent_token_plan_enterprise_pro\"\nbase_url = \"https://tokenhub.tencentmaas.com/plan/v3\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "Tencent Token Plan Enterprise Pro (Intl)",
      "category": "cn_official",
      "websiteUrl": "https://www.tencentcloud.com/products/tokenhub",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"auto\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"tencent_token_plan_enterprise_pro_intl\"\nbase_url = \"https://tokenhub-intl.tencentcloudmaas.com/plan/v3\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "Tencent Token Plan Enterprise Lite",
      "category": "cn_official",
      "websiteUrl": "https://cloud.tencent.com/product/tokenhub",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"auto\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"tencent_token_plan_enterprise_lite\"\nbase_url = \"https://tokenhub.tencentmaas.com/plan/v3\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "Tencent Token Plan Enterprise Lite (Intl)",
      "category": "cn_official",
      "websiteUrl": "https://www.tencentcloud.com/products/tokenhub",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"auto\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"tencent_token_plan_enterprise_lite_intl\"\nbase_url = \"https://tokenhub-intl.tencentcloudmaas.com/plan/v3\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "StepFun API",
      "category": "cn_official",
      "websiteUrl": "https://platform.stepfun.com",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"step-3.7-flash\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"stepfun_api\"\nbase_url = \"https://api.stepfun.com/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "StepFun API en",
      "category": "cn_official",
      "websiteUrl": "https://platform.stepfun.ai",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"step-3.7-flash\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"stepfun_api_en\"\nbase_url = \"https://api.stepfun.ai/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "StepFun",
      "category": "cn_official",
      "websiteUrl": "https://platform.stepfun.com/step-plan",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"step-3.7-flash\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"stepfun\"\nbase_url = \"https://api.stepfun.com/step_plan/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "StepFun en",
      "category": "cn_official",
      "websiteUrl": "https://platform.stepfun.ai/step-plan",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"step-3.7-flash\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"stepfun_en\"\nbase_url = \"https://api.stepfun.ai/step_plan/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "ModelScope",
      "category": "aggregator",
      "websiteUrl": "https://modelscope.cn",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"ZhipuAI/GLM-5.2\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"modelscope\"\nbase_url = \"https://api-inference.modelscope.cn/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "Longcat",
      "category": "cn_official",
      "websiteUrl": "https://longcat.chat/platform",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"LongCat-2.0\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"longcat\"\nbase_url = \"https://api.longcat.chat/openai/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "MiniMax",
      "category": "cn_official",
      "websiteUrl": "https://platform.minimax.cn",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"MiniMax-M3\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"minimax\"\nbase_url = \"https://api.minimax.cn/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "MiniMax en",
      "category": "cn_official",
      "websiteUrl": "https://platform.minimax.io",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"MiniMax-M3\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"minimax_en\"\nbase_url = \"https://api.minimax.io/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "Astron Coding Plan",
      "category": "cn_official",
      "websiteUrl": "https://maas.xfyun.cn/packageSubscription",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"astron-code-latest\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"astron_coding_plan\"\nbase_url = \"https://maas-coding-api.cn-huabei-1.xf-yun.com/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "BaiLing",
      "category": "cn_official",
      "websiteUrl": "https://developer.ant-ling.com/zh-CN/docs/",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"Ling-2.6-1T\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"bailing\"\nbase_url = \"https://api.ant-ling.com/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "Xiaomi MiMo",
      "category": "cn_official",
      "websiteUrl": "https://platform.xiaomimimo.com",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"mimo-v2.6-pro\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"xiaomi_mimo\"\nbase_url = \"https://api.xiaomimimo.com/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "Xiaomi MiMo Token Plan (China)",
      "category": "cn_official",
      "websiteUrl": "https://platform.xiaomimimo.com/#/token-plan",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"mimo-v2.6-pro\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"xiaomi_mimo_token_plan\"\nbase_url = \"https://token-plan-cn.xiaomimimo.com/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "Novita AI",
      "category": "aggregator",
      "websiteUrl": "https://novita.ai",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"zai-org/glm-5.3\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"novita\"\nbase_url = \"https://api.novita.ai/openai/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "xAI (Grok)",
      "category": "third_party",
      "websiteUrl": "https://x.ai/api",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"grok-4.5\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"xai\"\nbase_url = \"https://api.x.ai/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "xAI (Grok) OAuth",
      "category": "third_party",
      "websiteUrl": "https://x.ai/grok",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"grok-4.5\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"xai\"\nbase_url = \"https://api.x.ai/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = false",
      "isOfficial": false
    },
    {
      "name": "Nvidia",
      "category": "aggregator",
      "websiteUrl": "https://build.nvidia.com",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"moonshotai/kimi-k3\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"nvidia\"\nbase_url = \"https://integrate.api.nvidia.com/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "OpenCode Go",
      "category": "third_party",
      "websiteUrl": "https://opencode.ai/go",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"glm-5.3\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"opencode_go\"\nbase_url = \"https://opencode.ai/zen/go/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "OpenCode Zen",
      "category": "aggregator",
      "websiteUrl": "https://opencode.ai/zen",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"opencode_zen\"\nbase_url = \"https://opencode.ai/zen/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "AiHubMix",
      "category": "aggregator",
      "websiteUrl": "https://aihubmix.com",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"aihubmix\"\nbase_url = \"https://aihubmix.com/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "CherryIN",
      "category": "aggregator",
      "websiteUrl": "https://open.cherryin.ai",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"openai/gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"cherryin\"\nbase_url = \"https://open.cherryin.net/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "RelaxyCode",
      "category": "third_party",
      "websiteUrl": "https://www.relaxycode.com",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"relaxycode\"\nbase_url = \"https://www.relaxycode.com/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "E-FlowCode",
      "category": "third_party",
      "websiteUrl": "https://e-flowcode.cc",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"E-FlowCode\"\nbase_url = \"https://e-flowcode.cc/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true\nmodel_context_window = 1000000\nmodel_auto_compact_token_limit = 9000000",
      "isOfficial": false
    },
    {
      "name": "PIPELLM",
      "category": "aggregator",
      "websiteUrl": "https://code.pipellm.ai",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"medium\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"PIPELLM\"\nwire_api = \"responses\"\nrequires_openai_auth = true\nbase_url = \"https://cc-api.pipellm.ai/v1\"",
      "isOfficial": false
    },
    {
      "name": "OpenRouter",
      "category": "aggregator",
      "websiteUrl": "https://openrouter.ai",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"openrouter\"\nbase_url = \"https://openrouter.ai/api/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "TheRouter",
      "category": "aggregator",
      "websiteUrl": "https://therouter.ai",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"openai/gpt-5.3-codex\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"therouter\"\nbase_url = \"https://api.therouter.ai/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "JieKou AI",
      "category": "aggregator",
      "websiteUrl": "https://jiekou.ai/#model-library",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"claude-fable-5\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"jiekou\"\nbase_url = \"https://api.jiekou.ai/openai/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "AICodeWith",
      "category": "aggregator",
      "websiteUrl": "https://aicodewith.ai",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"gpt-5.6-sol\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"aicodewith\"\nbase_url = \"https://api.aicodewith.ai/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "Command Code",
      "category": "third_party",
      "websiteUrl": "https://commandcode.ai",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"deepseek/deepseek-v4.1-flash\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"command_code\"\nbase_url = \"https://api.commandcode.ai/provider/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    },
    {
      "name": "模力方舟",
      "category": "aggregator",
      "websiteUrl": "https://moark.com",
      "auth": {
        "OPENAI_API_KEY": ""
      },
      "config": "model_provider = \"custom\"\nmodel = \"deepseek-v4-flash-0731\"\nmodel_reasoning_effort = \"high\"\ndisable_response_storage = true\n\n[model_providers.custom]\nname = \"moark\"\nbase_url = \"https://moark.com/v1\"\nwire_api = \"responses\"\nrequires_openai_auth = true",
      "isOfficial": false
    }
  ],
  "gemini-cli": [
    {
      "name": "Google Official",
      "category": "official",
      "websiteUrl": "https://ai.google.dev/",
      "settingsConfig": {
        "env": {}
      },
      "isOfficial": false
    },
    {
      "name": "PackyCode",
      "category": "third_party",
      "websiteUrl": "https://www.packyapi.ai",
      "settingsConfig": {
        "env": {
          "GOOGLE_GEMINI_BASE_URL": "https://www.packyapi.ai",
          "GEMINI_MODEL": "gemini-3.6-flash"
        }
      },
      "isOfficial": false
    },
    {
      "name": "APINebula",
      "category": "third_party",
      "websiteUrl": "https://apinebula.ai",
      "settingsConfig": {
        "env": {
          "GOOGLE_GEMINI_BASE_URL": "https://apinebula.ai",
          "GEMINI_API_KEY": "",
          "GEMINI_MODEL": "gemini-3.6-flash"
        }
      },
      "isOfficial": false
    },
    {
      "name": "AICodeMirror",
      "category": "third_party",
      "websiteUrl": "https://www.aicodemirror.ai",
      "settingsConfig": {
        "env": {
          "GOOGLE_GEMINI_BASE_URL": "https://api.aicodemirror.ai/api/gemini",
          "GEMINI_MODEL": "gemini-3.6-flash"
        }
      },
      "isOfficial": false
    },
    {
      "name": "Shengsuanyun",
      "category": "aggregator",
      "websiteUrl": "https://www.shengsuanyun.com/?from=CH_4HHXMRYF",
      "settingsConfig": {
        "env": {
          "GOOGLE_GEMINI_BASE_URL": "https://router.shengsuanyun.com/api",
          "GEMINI_MODEL": "google/gemini-3.6-flash"
        }
      },
      "isOfficial": false
    },
    {
      "name": "AIGoCode",
      "category": "third_party",
      "websiteUrl": "https://aigocode.app",
      "settingsConfig": {
        "env": {
          "GOOGLE_GEMINI_BASE_URL": "https://api.aigocode.app",
          "GEMINI_MODEL": "gemini-3.6-flash"
        }
      },
      "isOfficial": false
    },
    {
      "name": "Qiniu",
      "category": "aggregator",
      "websiteUrl": "https://s.qiniu.com/nMvAvy",
      "settingsConfig": {
        "env": {
          "GOOGLE_GEMINI_BASE_URL": "https://api.qnaigc.com/bypass/vertex",
          "GEMINI_MODEL": "gemini-3.6-flash"
        }
      },
      "isOfficial": false
    },
    {
      "name": "AICoding",
      "category": "third_party",
      "websiteUrl": "https://aicoding.inc",
      "settingsConfig": {
        "env": {
          "GOOGLE_GEMINI_BASE_URL": "https://api.aicoding.inc",
          "GEMINI_MODEL": "gemini-3.6-flash"
        }
      },
      "isOfficial": false
    },
    {
      "name": "SubRouter",
      "category": "aggregator",
      "websiteUrl": "https://subrouter.ai",
      "settingsConfig": {
        "env": {
          "GOOGLE_GEMINI_BASE_URL": "https://subrouter.ai/v1beta",
          "GEMINI_MODEL": "gemini-3.6-flash"
        }
      },
      "isOfficial": false
    },
    {
      "name": "88API",
      "category": "aggregator",
      "websiteUrl": "https://88api.ai",
      "settingsConfig": {
        "env": {
          "GOOGLE_GEMINI_BASE_URL": "https://api.88api.ai",
          "GEMINI_API_KEY": "",
          "GEMINI_MODEL": "gemini-3.8-flash"
        }
      },
      "isOfficial": false
    },
    {
      "name": "APIKEY.FUN",
      "category": "third_party",
      "websiteUrl": "https://apikey.fan",
      "settingsConfig": {
        "env": {
          "GOOGLE_GEMINI_BASE_URL": "https://api.apikey.fan",
          "GEMINI_API_KEY": "",
          "GEMINI_MODEL": "gemini-3.6-flash"
        }
      },
      "isOfficial": false
    },
    {
      "name": "9527CODE",
      "category": "aggregator",
      "websiteUrl": "https://9527.codes",
      "settingsConfig": {
        "env": {
          "GOOGLE_GEMINI_BASE_URL": "https://9527.codes",
          "GEMINI_API_KEY": "",
          "GEMINI_MODEL": "gemini-3.6-flash"
        }
      },
      "isOfficial": false
    },
    {
      "name": "Code0",
      "category": "aggregator",
      "websiteUrl": "https://code0.ai",
      "settingsConfig": {
        "env": {
          "GOOGLE_GEMINI_BASE_URL": "https://code0.ai",
          "GEMINI_MODEL": "gemini-3.6-flash"
        }
      },
      "isOfficial": false
    },
    {
      "name": "A6API",
      "category": "aggregator",
      "websiteUrl": "https://www.a6api.com",
      "settingsConfig": {
        "env": {
          "GOOGLE_GEMINI_BASE_URL": "https://api.a6api.com",
          "GEMINI_MODEL": "gemini-3.6-flash"
        }
      },
      "isOfficial": false
    },
    {
      "name": "SSSAiCode",
      "category": "third_party",
      "websiteUrl": "https://sssaicodeapi.com",
      "settingsConfig": {
        "env": {
          "GOOGLE_GEMINI_BASE_URL": "https://node-hk.sssaicodeapi.com/api",
          "GEMINI_MODEL": "gemini-3.6-flash"
        }
      },
      "isOfficial": false
    },
    {
      "name": "SoleAPI",
      "category": "aggregator",
      "websiteUrl": "https://soleapi.com",
      "settingsConfig": {
        "env": {
          "GOOGLE_GEMINI_BASE_URL": "https://soleapi.com",
          "GEMINI_API_KEY": "",
          "GEMINI_MODEL": "gemini-3.8-flash"
        }
      },
      "isOfficial": false
    },
    {
      "name": "Cubence",
      "category": "third_party",
      "websiteUrl": "https://cubence.com",
      "settingsConfig": {
        "env": {
          "GOOGLE_GEMINI_BASE_URL": "https://api.cubence.com",
          "GEMINI_MODEL": "gemini-3.6-flash"
        }
      },
      "isOfficial": false
    },
    {
      "name": "CrazyRouter",
      "category": "third_party",
      "websiteUrl": "https://www.crazyrouter.com",
      "settingsConfig": {
        "env": {
          "GOOGLE_GEMINI_BASE_URL": "https://cn.crazyrouter.com",
          "GEMINI_MODEL": "gemini-3.6-flash"
        }
      },
      "isOfficial": false
    },
    {
      "name": "SudoCode.us",
      "category": "third_party",
      "websiteUrl": "https://sudocode.us",
      "settingsConfig": {
        "env": {
          "GOOGLE_GEMINI_BASE_URL": "https://sudocode.us",
          "GEMINI_API_KEY": "",
          "GEMINI_MODEL": "gemini-3.1-flash-lite"
        }
      },
      "isOfficial": false
    },
    {
      "name": "XycAi",
      "category": "aggregator",
      "websiteUrl": "https://xycai.us",
      "settingsConfig": {
        "env": {
          "GOOGLE_GEMINI_BASE_URL": "https://apicdn.xycai.us",
          "GEMINI_API_KEY": "",
          "GEMINI_MODEL": "gemini-3.6-flash"
        }
      },
      "isOfficial": false
    },
    {
      "name": "Tu-zi",
      "category": "aggregator",
      "websiteUrl": "https://api.tu-zi.com",
      "settingsConfig": {
        "env": {
          "GOOGLE_GEMINI_BASE_URL": "https://api.tu-zi.com",
          "GEMINI_API_KEY": "",
          "GEMINI_MODEL": "gemini-3.8-flash"
        }
      },
      "isOfficial": false
    },
    {
      "name": "E-FlowCode",
      "category": "third_party",
      "websiteUrl": "https://e-flowcode.cc",
      "settingsConfig": {
        "env": {
          "GOOGLE_GEMINI_BASE_URL": "https://e-flowcode.cc",
          "GEMINI_API_KEY": "",
          "GEMINI_MODEL": "gemini-3.6-flash"
        },
        "config": {
          "general": {
            "previewFeatures": true,
            "sessionRetention": {
              "enabled": true,
              "maxAge": "30d",
              "warningAcknowledged": true
            }
          },
          "mcpServers": {},
          "security": {
            "auth": {
              "selectedType": "gemini-api-key"
            }
          }
        }
      },
      "isOfficial": false
    },
    {
      "name": "CherryIN",
      "category": "aggregator",
      "websiteUrl": "https://open.cherryin.ai",
      "settingsConfig": {
        "env": {
          "GOOGLE_GEMINI_BASE_URL": "https://open.cherryin.net",
          "GEMINI_API_KEY": "",
          "GEMINI_MODEL": "google/gemini-3.6-flash"
        }
      },
      "isOfficial": false
    },
    {
      "name": "OpenRouter",
      "category": "aggregator",
      "websiteUrl": "https://openrouter.ai",
      "settingsConfig": {
        "env": {
          "GOOGLE_GEMINI_BASE_URL": "https://openrouter.ai/api",
          "GEMINI_MODEL": "gemini-3.6-flash"
        }
      },
      "isOfficial": false
    },
    {
      "name": "TheRouter",
      "category": "aggregator",
      "websiteUrl": "https://therouter.ai",
      "settingsConfig": {
        "env": {
          "GOOGLE_GEMINI_BASE_URL": "https://api.therouter.ai",
          "GEMINI_MODEL": "gemini-3.6-flash"
        }
      },
      "isOfficial": false
    },
    {
      "name": "AICodeWith",
      "category": "aggregator",
      "websiteUrl": "https://aicodewith.ai",
      "settingsConfig": {
        "env": {
          "GOOGLE_GEMINI_BASE_URL": "https://api.aicodewith.ai/gemini_cli",
          "GEMINI_MODEL": "gemini-3.1-pro-preview"
        }
      },
      "isOfficial": false
    }
  ]
};
