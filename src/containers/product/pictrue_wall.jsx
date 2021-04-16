import React,{Component} from 'react'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { reqDeleteImg } from '../../api/index'
import { BASE_URL } from '../../config/index'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PictrueWall extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  };
  // modal的取消回调
  handleCancel = () => this.setState({ previewVisible: false })
  // 获取图片列表中的name组成的list 返给服务器上传用
  getImgNameList = () => {
    return this.state.fileList.map( item => item.name )
  }
  //  父组件调用该方法后 加工后 将服务器中的数据 处理后 做显示
  setImgList = imgArr => {
    let fileList = []
    imgArr.forEach((item, index) => {
      fileList.push({
        uid: -index,
        name: item,
        url: BASE_URL + '/upload/' + item
      })
    })
    this.setState({fileList})
  }
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  // 图片的状态改变的回调
  handleChange = async ({ file,  fileList }) => {
    const { status } = file
    if( status === 'done' ){
      // 文件上传成功 记下文件的name与url
      fileList[fileList.length - 1].name = file.response.data.name
      fileList[fileList.length - 1].url = file.response.data.url
    }
    if( status === 'removed' ){
      // 如果图片时删除的 要去服务器中也删除图片 带上图片的唯一标识name 去服务器中删除图片
      console.log('delete img', file.name);
      const result = await reqDeleteImg(file.name)
      const { status } = result
      if( status === 0 ) message.success('删除成功', 2)
      else message.error('删除失败', 2)
    }
    this.setState({ fileList });
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action="/api1/manage/img/upload"
          name="image"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="上传图片" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}