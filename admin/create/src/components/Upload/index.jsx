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

    console.log("uploadChange", JSON.stringify(file), JSON.stringify(fileList));

    let currentFileList = cloneDeep(attachmentList);
    if (file.size > maxFileLength * 1024 * 1024) {
      message.error(`附件不能超过${maxFileSize}MB,请重新上传`);
      fileList = fileList.filter(f => f.uid !== file.uid);
    }
    let _fileList = [...fileList];

    for (const f of _fileList) {
      const fileIndex = currentFileList.findIndex(i => i.uid == f.uid);
      if (currentFileList[fileIndex]) {
        if (!f.url) {
          f.fileId = f.response && f.response[0] && f.response[0].fileId || "";
          f.localName = f.response && f.response[0] &&
            f.response[0].localName || "";
          f.url = f.response && f.response[0] &&
            f.response[0].openUrl &&
            f.response[0].openUrl.replace(/http:\/\/[^\/]*/, "") || "";
        }
        f.uploadType = "0";
        currentFileList[fileIndex] = f;
      } else {
        currentFileList.push(f);
      }
    }
    currentFileList = currentFileList.slice(-maxFileLength);
    const { changeAttachmentList } = this.props;
    changeAttachmentList(currentFileList);
  };
  removeFile = (file) => {
    if (!isEmpty(file)) {
      console.log("removeFile_", file);
      const _file = isEmpty(file) || isEmpty(file.response) || !Array.isArray(file.response) ? "" :
        file.response.find(f => f.localName == file.localName);
      if (_file) {
        this.props.dispatch({
          type: "static/deleteStaticResource",
          payload: {
            fileId: _file.fileId,
            success: (id) => {
              this.removeFileToChangeState(id);
            }
          },
        });
      } else {
        this.removeFileToChangeState(_file.fileId);
      }
    }
  }
  removeFileToChangeState = (id) => {
    const { attachmentList } = this.props;
    let currentFileList = attachmentList.filter(f => f.uid !== file.uid);
    const { changeAttachmentList } = this.props;
    changeAttachmentList(currentFileList);
  }
  render() {
    const { accept, avtor, type, attachmentList } = this.props;
    return (
      <div>
        {!avtor ?
          <Upload action={'/api/static'}
            accept={accept}
            listType={type}
            headers={{ Authorization: localStorage.getItem('token') }}
            fileList={attachmentList}
            withCredentials={true}
            onRemove={this.removeFile}
            onChange={this.uploadChange}>
            <Button>
              <Icon type="upload" /> 上传
            </Button>
          </Upload>
          : null}
      </div>
    );
  }
}

export default MyUpload;
