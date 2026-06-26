<script setup>
import { ref } from "vue";
import { cloneDeep, each, isFunction } from "lodash-es";
import { useId } from "@su-130pm/hooks";
import ErButton from "../Button/Button.vue";
import UploadList from "./UploadList.vue";

defineOptions({
  name: "ErUpload",
});

const props = defineProps({
  action: {
    type: String,
    default: "",
  },
  defaultFileList: Array,
  beforeUpload: Function,
  onChange: Function,
  onProgress: Function,
  onSuccess: Function,
  onError: Function,
  onRemove: Function,
});

const fileInputRef = ref();
const fileList = ref(props.defaultFileList ?? []);

function setFileListItem(item) {
  const index = fileList.value.findIndex((file) => file.uid === item.uid);
  if (index !== -1) {
    fileList.value.splice(index, 1, cloneDeep(item));
  } else {
    fileList.value.unshift(cloneDeep(item));
  }
}

function handleClick() {
  fileInputRef.value?.click();
}

function handleFileChange(e) {
  const files = e.target?.files;
  if (!files) return;
  uploadFiles(files);
  if (fileInputRef.value) {
    fileInputRef.value.value = "";
  }
}

function uploadFiles(files) {
  const postFiles = Array.from(files);
  each(postFiles, (file) => {
    if (!props?.beforeUpload) {
      post(file);
    } else {
      const result = props.beforeUpload(file);
      if (result && result instanceof Promise) {
        result.then((processFile) => {
          post(processFile);
        });
      } else if (result !== false) {
        post(file);
      }
    }
  });
}

function post(file) {
  const _file = {
    uid: useId().value + "_upload-file_" + Date.now(),
    status: "ready",
    name: file.name,
    size: file.size,
    percent: 0,
    raw: file,
  };

  setFileListItem(_file);

  const formData = new FormData();
  formData.append(file.name, file);

  // Use fetch API instead of axios to avoid extra dependency
  const xhr = new XMLHttpRequest();
  xhr.open("POST", props.action);

  xhr.upload.onprogress = (e) => {
    let percent = Math.round((e.loaded * 100) / e.total) || 0;
    _file.percent = percent;
    if (percent < 100) {
      _file.status = "uploading";
      setFileListItem(_file);
    }
    isFunction(props.onProgress) && props.onProgress(percent, file);
  };

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      _file.status = "success";
      let response;
      try {
        response = JSON.parse(xhr.responseText);
      } catch {
        response = xhr.responseText;
      }
      _file.response = response;
      isFunction(props.onSuccess) && props.onSuccess(response, file);
      setFileListItem(_file);
    } else {
      _file.status = "error";
      isFunction(props.onError) && props.onError(new Error("Upload failed"), file);
      setFileListItem(_file);
    }
    isFunction(props.onChange) && props.onChange(file);
  };

  xhr.onerror = () => {
    _file.status = "error";
    isFunction(props.onError) && props.onError(new Error("Network error"), file);
    setFileListItem(_file);
    isFunction(props.onChange) && props.onChange(file);
  };

  xhr.send(formData);
}

function handleRemove(file) {
  fileList.value = fileList.value.filter((item) => item.uid !== file.uid);
  isFunction(props.onRemove) && props.onRemove(file);
}
</script>

<template>
  <div class="er-upload">
    <div class="er-upload__content" @click="handleClick">
      <slot>
        <ErButton type="primary">Upload File</ErButton>
      </slot>
    </div>
    <input
      ref="fileInputRef"
      class="er-file-input"
      type="file"
      @change="handleFileChange"
      style="display: none"
    />
    <UploadList :file-list="fileList" :on-remove="handleRemove" />
  </div>
</template>
