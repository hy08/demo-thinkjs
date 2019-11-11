import React, { Component } from 'react';
import { connect } from 'dva';
import { Upload, Button, Icon, message } from 'antd';
import { cloneDeep, isEmpty } from 'lodash';

@connect(({ }) => ({}))
class MyUpload extends Component {
  constructor(props) {
    super(props);
  }
  uploadChange = ({ fileList, file }) => {
    const { attachmentList, maxFileSize, maxFileLength } = this.props;
    if (isEmpty(fileList) || isEmpty(file) || maxFileSize <= 0 || maxFileLength <= 0) return;

    console.log("uploadChange", file, fileList);

    let currentFileList = cloneDeep(attachmentList || []);
    if (file.size > maxFileLength * 1024 * 1024) {
      message.error(`附件不能超过${maxFileSize}MB,请重新上传`);
      fileList = fileList.filter(f => f.uid !== file.uid);
    }
    let _fileList = [...fileList];

    for (const f of _fileList) {
      const fileIndex = currentFileList.findIndex(i => i.uid == f.uid);
      if (currentFileList[fileIndex]) {
        if (!f.url) {
          f.fileId = f.response && f.response.data && f.response.data.fileId || "";
          f.localName = f.response && f.response.data &&
            f.response.data.localName || "";
          f.url = f.response && f.response.data &&
            f.response.data.openUrl &&
            f.response.data.openUrl.replace(/http:\/\/[^\/]*/, "") || "";
        }
        f.uploadType = "0";
        currentFileList[fileIndex] = f;
      } else {
        currentFileList.push(f);
      }
    }
    currentFileList = currentFileList.slice(-maxFileLength);
    const { changeAttachmentList } = this.props;
    changeAttachmentList && changeAttachmentList(currentFileList);
  };
  removeFile = (file) => {
    if (!isEmpty(file)) {
      console.log("removeFile_", file);
      this.removeFileToChangeState(file.fileId);
      // const _file = isEmpty(file) || isEmpty(file.response) ? "" : file.response;
      // if (_file) {
      //   this.props.dispatch({
      //     type: "static/deleteStaticResource",
      //     payload: {
      //       data: {
      //         fileId: _file.data.fileId,
      //       },
      //       success: (id) => {
      //         this.removeFileToChangeState(id);
      //       }
      //     },
      //   });
      // } else {
      //   this.removeFileToChangeState(_file.fileId);
      // }
    }
  }
  removeFileToChangeState = (id) => {
    const { attachmentList } = this.props;
    let currentFileList = attachmentList.filter(f => f.fileId !== id);
    const { changeAttachmentList } = this.props;
    changeAttachmentList && changeAttachmentList(currentFileList);
  }
  render() {
    const { accept, avtor, disabled, type, attachmentList } = this.props;
    return (
      <div>
        {!avtor ?
          <Upload action={'/api/static'}
            disabled={disabled}
            accept={accept}
            listType={type}
            headers={{ Authorization: localStorage.getItem('token') }}
            defaultFileList={attachmentList}
            fileList={attachmentList}
            withCredentials={true}
            onRemove={this.removeFile}
            onChange={this.uploadChange}>
            <Button disabled={disabled}>
              <Icon type="upload" /> 上传
            </Button>
          </Upload>
          : null}
      </div>
    );
  }
}

export default MyUpload;
