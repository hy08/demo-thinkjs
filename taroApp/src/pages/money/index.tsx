import Taro, { Component, Config, ComponentClass } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { split } from 'lodash';
import { View, Text, Image } from '@tarojs/components';
import TabBar from '@/components/tabBar/index';
import { TabType } from '@/util/enum';
import { AtTabs, AtTabsPane } from 'taro-ui';
import './index.less';
import { getOrigin } from '@/util/util';

const NoPicUrl = require('@/assets/img/noPic.png');

type PageStateProps = {};

type PageDispatchProps = {
  getCategorys: () => any;
  getProducts: (data) => any;
  getDevices: () => any;
};
type PageOwnProps = {};

type PageState = {
  pageType: TabType;
  products: any;
  categorys: any;
  devices: any;
  selectedCategoryCode?: string;
  currentCategoryIndex?: number;
};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

@connect(
  () => ({}),
  (dispatch) => ({
    getCategorys() {
      return dispatch({
        type: 'model/getCategorys',
        payload: {
          current: 0,
          pageSize: 100
        }
      });
    },
    getProducts: (data) => {
      return dispatch({
        type: 'model/getProducts',
        payload: { data }
      });
    },
    getDevices() {
      return dispatch({
        type: 'model/getDevices',
        payload: {
          data: {}
        }
      });
    }
  })
)
class Index extends Component<IProps, PageState> {
  constructor(props) {
    super(props);
    this.state = {
      pageType: TabType.Product,
      products: [],
      categorys: [],
      devices: [],
      selectedCategoryCode: undefined,
      currentCategoryIndex: 0
    };
  }

  componentWillMount() {
    console.log(this.$router.params);
    const { type, code } = this.$router.params;
    if (Number(type) === TabType.Product) {
      console.log('产品');
      this.setState({ pageType: TabType.Product });
      this.config.navigationBarTitleText = '产品';
    } else {
      console.log('设备');
      this.setState({ pageType: TabType.Device });
      this.config.navigationBarTitleText = '设备';
    }
    if (code) {
      this.setState({ selectedCategoryCode: code });
    }
  }

  componentDidMount() {
    const { pageType, selectedCategoryCode } = this.state;
    if (pageType === TabType.Product && !selectedCategoryCode) {
      // 获取所有商品类型
      this.props.getCategorys().then((data) => {
        //获取第一个类型的所有商品
        const category = data[0];
        this.setState({ categorys: data, selectedCategoryCode: category.code, currentCategoryIndex: 0 });
        this.props
          .getProducts({
            categoryCode: category.code
          })
          .then((data) => {
            this.setState({ products: data });
          });
      });
    } else if (pageType === TabType.Product && selectedCategoryCode) {
      // 获取所有商品类型
      this.props.getCategorys().then((data) => {
        this.setState({ categorys: data });
        const current = data.findIndex((item) => item.code === selectedCategoryCode);
        if (current !== -1) {
          this.setState({ currentCategoryIndex: current });
          this.props
            .getProducts({
              categoryCode: selectedCategoryCode
            })
            .then((data) => {
              this.setState({ products: data });
            });
        } else {
          const category = data[0];
          this.setState({ selectedCategoryCode: category.code, currentCategoryIndex: 0 });
          this.props
            .getProducts({
              categoryCode: category.code
            })
            .then((data) => {
              this.setState({ products: data });
            });
        }
      });
    } else {
      //获取所有设备
      this.props.getDevices().then((data) => {
        this.setState({ devices: data });
      });
    }
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config: Config = {
    navigationBarTitleText: this.state.pageType === TabType.Product ? '产品' : '设备'
  };
  handlecategoryClick(currentCategoryIndex: number) {
    const selectedCategory = this.state.categorys.find((item, index) => index === currentCategoryIndex);
    this.setState({ products: [], currentCategoryIndex: currentCategoryIndex });
    this.props
      .getProducts({
        categoryCode: selectedCategory!.code
      })
      .then((data) => {
        this.setState({ products: data });
      });
  }
  getCategoryList() {
    const { categorys } = this.state;
    return categorys.map((item) => ({ title: item.category }));
  }
  gotoDetail(id: number) {
    const { pageType } = this.state;
    Taro.navigateTo({ url: `/pages/detail/index?type=${pageType}&id=${id}` });
  }
  render() {
    const { pageType, categorys, products, currentCategoryIndex, devices } = this.state;
    let list: Array<{ name: string; pic: string; id: number }> = [];
    if (pageType === TabType.Product) {
      list = products.map((item) => ({
        id: item.id,
        name: item.name,
        pic: split(item.pics, ',')[0] ? `${getOrigin() + split(item.pics, ',')[0]}` : `${NoPicUrl}`
      }));
    } else {
      list = devices.map((item) => ({
        id: item.id,
        name: item.name,
        pic: split(item.pics, ',')[0] ? `${getOrigin() + split(item.pics, ',')[0]}` : `${NoPicUrl}`
      }));
    }
    return (
      <View className="page_money_container">
        {pageType === TabType.Product ? (
          <AtTabs current={currentCategoryIndex!} scroll tabList={this.getCategoryList()} onClick={this.handlecategoryClick.bind(this)}>
            {categorys.map((category, index) => {
              return (
                <AtTabsPane current={currentCategoryIndex!} index={index}>
                  <View className="page_money_list">
                    {list.map((item) => {
                      return (
                        <View
                          className="page_money_item"
                          onClick={() => {
                            this.gotoDetail(item.id);
                          }}
                        >
                          <Image className="page_money_item_pic" src={item.pic} />
                          <View className="page_money_item_name">
                            <Text className="page_money_item_text">商品名：{item.name}</Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </AtTabsPane>
              );
            })}
          </AtTabs>
        ) : (
          <View className="page_money_device">
            <View className="page_money_device_title">
              <Text className="page_money_device_label"></Text>
              <Text className="page_money_device_text">公司设备</Text>
            </View>
            <View className="page_money_list">
              {list.map((item) => {
                return (
                  <View
                    className="page_money_item"
                    onClick={() => {
                      this.gotoDetail(item.id);
                    }}
                  >
                    <Image className="page_money_item_pic" src={item.pic} />
                    <View className="page_money_item_name">
                      <Text className="page_money_item_text">设备名：{item.name}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )}
        <TabBar current={pageType} />
      </View>
    );
  }
}
export default Index as ComponentClass<IProps, PageState>;
