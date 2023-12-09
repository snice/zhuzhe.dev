<template>
    <div>
        <a-form :model="packageJson" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-item label="插件名">
                <a-input v-model:value="packageJson.name" />
            </a-form-item>
            <a-form-item label="插件ID">
                <a-input v-model:value="packageJson.id" />
            </a-form-item>
            <a-form-item label="插件版本">
                <a-input v-model:value="packageJson.version" />
            </a-form-item>
            <a-form-item label="插件描述">
                <a-input v-model:value="packageJson.description" />
            </a-form-item>
            <a-form-item label="平台">
                android <a-switch v-model:checked="androidPlugin" />
                iOS <a-switch v-model:checked="iosPlugin" />
            </a-form-item>
            <a-form-item label="平台配置">
                <a-tabs v-model:activeKey="activeKey" type="card">
                    <a-tab-pane v-if="androidPlugin" key="1" tab="android">
                        <a-form-item label="minSdkVersion">
                            <a-input-number v-model:value="android.minSdkVersion" />
                        </a-form-item>
                        <a-form-item label="hooksClass">
                            <a-input v-model:value="android.hooksClass" />
                        </a-form-item>
                        <a-form-item label="abis">
                            <a-checkbox-group v-model:value="android.abis" :options="abiOptions" />
                        </a-form-item>
                        <a-form-item label="android插件">
                            <div>
                                <a-button :icon="h(PlusOutlined)" @click="android.plugins.push({ type: 'module' })" />
                            </div>
                            <fieldset style="padding: 5px;width: 420px;" v-for="(item, i) in android.plugins"
                                :key="'ap' + i">
                                <legend style="margin-left: 20px;width: 55px;">插件项</legend>
                                <a-form-item label="插件name">
                                    <a-input v-model:value="item.name" />
                                </a-form-item>
                                <a-form-item label="插件类型">
                                    <a-radio-group v-model:value="item.type" :options="pluginTypes" />
                                </a-form-item>
                                <a-form-item label="插件class">
                                    <a-input v-model:value="item.class" />
                                </a-form-item>
                                <a-button :icon="h(MinusOutlined)" @click="android.plugins.splice(i, 1)" />
                            </fieldset>
                        </a-form-item>
                        <a-form-item label="android依赖">
                            <div>
                                <a-button :icon="h(PlusOutlined)" @click="android.dependencies.push('')" />
                            </div>
                            <div style="flex: 1;" v-for="(item, i) in android.dependencies" :key="'ad' + i">
                                <a-input style="width: 88%;" v-model:value="android.dependencies[i]" />
                                <a-button :icon="h(MinusOutlined)" @click="android.dependencies.splice(i, 1)" />
                            </div>
                        </a-form-item>
                        <a-form-item label="android参数">
                            <div>
                                <a-button :icon="h(PlusOutlined)" @click="android.parameters.push({ type: 'key' })" />
                            </div>
                            <fieldset style="padding: 5px;width: 420px;" v-for="(item, i) in android.parameters"
                                :key="'apa' + i">
                                <legend style="margin-left: 20px;width: 55px;">参数项</legend>
                                <a-form-item label="参数名称">
                                    <a-input v-model:value="item.name" />
                                </a-form-item>
                                <a-form-item label="参数描述">
                                    <a-input v-model:value="item.des" />
                                </a-form-item>
                                <a-form-item label="参数类型">
                                    <a-radio-group v-model:value="item.type" :options="paramTypes" />
                                </a-form-item>
                                <a-form-item label="参数变量">
                                    <a-input v-model:value="item.value" />
                                </a-form-item>
                                <a-button :icon="h(MinusOutlined)" @click="android.parameters.splice(i, 1)" />
                            </fieldset>
                        </a-form-item>
                    </a-tab-pane>
                    <a-tab-pane v-if="iosPlugin" key="2" tab="iOS">
                        <a-form-item label="deploymentTarget">
                            <a-input v-model:value="ios.deploymentTarget" />
                        </a-form-item>
                        <a-form-item label="hooksClass">
                            <a-input v-model:value="ios.hooksClass" />
                        </a-form-item>
                        <a-form-item label="ios插件">
                            <div>
                                <a-button :icon="h(PlusOutlined)" @click="ios.plugins.push({ type: 'module' })" />
                            </div>
                            <fieldset style="padding: 5px;width: 420px;" v-for="(item, i) in ios.plugins" :key="'ip' + i">
                                <legend style="margin-left: 20px;width: 55px;">插件项</legend>
                                <a-form-item label="插件name">
                                    <a-input v-model:value="item.name" />
                                </a-form-item>
                                <a-form-item label="插件类型">
                                    <a-radio-group v-model:value="item.type" :options="pluginTypes" />
                                </a-form-item>
                                <a-form-item label="插件class">
                                    <a-input v-model:value="item.class" />
                                </a-form-item>
                                <a-button :icon="h(MinusOutlined)" @click="ios.plugins.splice(i, 1)" />
                            </fieldset>
                        </a-form-item>
                        <a-form-item label="ios依赖">
                            <div>
                                <a-button :icon="h(PlusOutlined)" @click="ios.frameworks.push({})" />
                            </div>
                            <fieldset style="padding: 5px;" v-for="(item, i) in ios.frameworks" :key="'id' + i">
                                <legend style="margin-left: 20px;width: 40px;">ios库</legend>
                                <a-input v-model:value="item.name" placeholder="库名: xx.framework/xx.tbd/xx.dylib" />
                                是否动态库<a-switch v-model:checked="item.isDynamic" /> <br>
                                <a-button :icon="h(MinusOutlined)" @click="ios.frameworks.splice(i, 1)" />
                            </fieldset>
                        </a-form-item>
                        <a-form-item label="ios参数">
                            <div>
                                <a-button :icon="h(PlusOutlined)" @click="ios.parameters.push({})" />
                            </div>
                            <fieldset style="padding: 5px;width: 420px;" v-for="(item, i) in ios.parameters"
                                :key="'ipa' + i">
                                <legend style="margin-left: 20px;width: 55px;">参数项</legend>
                                <a-form-item label="参数名称">
                                    <a-input v-model:value="item.name" />
                                </a-form-item>
                                <a-form-item label="参数描述">
                                    <a-input v-model:value="item.des" />
                                </a-form-item>
                                <a-form-item label="参数变量">
                                    <a-input v-model:value="item.key"
                                        placeholder="变量配置到info.plist中的键名, 嵌套时使用:分割，如getui:appid" />
                                </a-form-item>
                                <a-button :icon="h(MinusOutlined)" @click="ios.parameters.splice(i, 1)" />
                            </fieldset>
                        </a-form-item>
                    </a-tab-pane>
                </a-tabs>
            </a-form-item>
        </a-form>
        <div class="language-json">
            <button title="Copy Code" class="copy"></button>
            <a-button class="download" :icon="h(DownloadOutlined)" @click="download" />
            <span class="lang">json</span>
            <pre><span class="line">{{ pJson }}</span></pre>
        </div>
    </div>
</template>
<script setup>
// import { } from 'vitepress'
import {
    Button as AButton,
    Tabs as ATabs, TabPane as ATabPane,
    Form as AForm, FormItem as AFormItem, Input as AInput, Switch as ASwitch,
    InputNumber as AInputNumber,
    RadioGroup as ARadioGroup,
    CheckboxGroup as ACheckboxGroup
} from 'ant-design-vue'
import { PlusOutlined, MinusOutlined, DownloadOutlined } from '@ant-design/icons-vue'
import { h, ref, computed } from 'vue';
import FileSaver from 'file-saver';
const activeKey = ref('1');
const androidPlugin = ref(true)
const iosPlugin = ref(false)
const labelCol = { style: { width: '120px' } };
const wrapperCol = { span: 14 };

const abiOptions = ['armeabi-v7a', 'arm64-v8a', 'x86'];

const pluginTypes = ref([
    { label: '原生模块', value: 'module' },
    { label: '原生组件', value: 'component' },
])

const paramTypes = ref([
    { label: 'meta-data', value: 'key' },
    { label: 'manifestPlaceholders', value: 'placeholder' },
])

const android = ref({
    "integrateType": "aar",
    "minSdkVersion": 21,
    "compileOptions": {
        "sourceCompatibility": "1.8",
        "targetCompatibility": "1.8"
    },
    "abis": [],
    "hooksClass": "",
    "plugins": [],
    "dependencies": [],
    "parameters": []
})
const ios = ref({
    "embedSwift": true,
    "integrateType": "framework",
    "deploymentTarget": "11.0",
    "hooksClass": "",
    "plugins": [],
    "frameworks": [],
    "parameters": []
})

const packageJson = ref({
    "name": "",
    "id": "",
    "version": "1.0.0",
    "description": "",
    "_dp_type": "nativeplugin",
    "_dp_nativeplugin": {}
})
const pJson = computed(() => {
    const json = {
        ...packageJson.value
    }
    if (androidPlugin.value) {
        json._dp_nativeplugin['android'] = { ...android.value }
        if (android.value.abis.length == 0)
            delete json._dp_nativeplugin['android'].abis
        if (!android.value.hooksClass)
            delete json._dp_nativeplugin['android'].hooksClass
        if (android.value.plugins.length == 0)
            delete json._dp_nativeplugin['android'].plugins
        if (android.value.dependencies.length == 0)
            delete json._dp_nativeplugin['android'].dependencies
        if (android.value.parameters.length == 0)
            delete json._dp_nativeplugin['android'].parameters
        else {
            let entries = json._dp_nativeplugin['android'].parameters
                .filter(it => it.name != null && it.name != '')
            if (entries.length > 0) {
                json._dp_nativeplugin['android'].parameters = Object.fromEntries(entries
                    .map(it => {
                        let item = { name: it.name, des: it.des }
                        item[it.type] = it.value
                        return item
                    })
                    .map(it => {
                        let item = { ...it }
                        delete item.name
                        return [it.name, item]
                    }))
            } else {
                delete json._dp_nativeplugin['android'].parameters
            }
        }
    } else
        delete json._dp_nativeplugin['android']
    if (iosPlugin.value) {
        json._dp_nativeplugin['ios'] = { ...ios.value }
        if (!ios.value.hooksClass)
            delete json._dp_nativeplugin['ios'].hooksClass
        if (ios.value.plugins.length == 0)
            delete json._dp_nativeplugin['ios'].plugins
        if (ios.value.parameters.length == 0)
            delete json._dp_nativeplugin['ios'].parameters
        else {
            let entries = json._dp_nativeplugin['ios'].parameters
                .filter(it => it.name != null && it.name != '')
            if (entries.length > 0) {
                json._dp_nativeplugin['ios'].parameters = Object.fromEntries(entries
                    .map(it => {
                        let item = { ...it }
                        delete item.name
                        return [it.name, item]
                    }))
            } else {
                delete json._dp_nativeplugin['ios'].parameters
            }
        }

        json._dp_nativeplugin['ios'].frameworks = json._dp_nativeplugin['ios'].frameworks.filter(it => it.name != null && it.name != '')
        if (json._dp_nativeplugin['ios'].frameworks.length == 0) {
            delete json._dp_nativeplugin['ios'].frameworks
        } else {
            json._dp_nativeplugin['ios'].embedFrameworks = json._dp_nativeplugin['ios'].frameworks
                .filter(it => it.isDynamic)
                .map(it => it.name)
            json._dp_nativeplugin['ios'].frameworks = json._dp_nativeplugin['ios'].frameworks.map(it => it.name)
            if (json._dp_nativeplugin['ios'].embedFrameworks.length == 0)
                delete json._dp_nativeplugin['ios'].embedFrameworks
        }
    } else
        delete json._dp_nativeplugin['ios']

    return JSON.stringify(json, null, 2)
})
const download = async () => {
    var blob = new Blob([pJson.value], { type: "application/json;charset=utf-8" });
    FileSaver.saveAs(blob, "package.json");
}
</script>

<style scoped>
.language-json {
    .download {
        position: absolute;
        top: 12px;
        right: 62px;
        z-index: 3;
        border: 1px solid var(--vp-code-copy-code-border-color);
        border-radius: 4px;
        width: 40px;
        height: 40px;
        background-color: transparent;
    }
}
</style>