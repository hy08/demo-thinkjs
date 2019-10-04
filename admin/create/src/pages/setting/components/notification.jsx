import { List, Switch } from 'antd';
import React, { Component, Fragment } from 'react';

class NotificationView extends Component {
  getData = () => {
    const Action = (
      <Switch
        checkedChildren=".-src.settings.open"
        unCheckedChildren=".-src.settings.close"
        defaultChecked
      />
    );
    return [
      {
        title: '.-src.notification.password',
        description: '.-src.notification.password-description',
        actions: [Action],
      },
      {
        title: '.-src.notification.messages',
        description: '.-src.notification.messages-description',
        actions: [Action],
      },
      {
        title: '.-src.notification.todo',
        description: '.-src.notification.todo-description',
        actions: [Action],
      },
    ];
  };

  render() {
    const data = this.getData();
    return (
      <Fragment>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
      </Fragment>
    );
  }
}

export default NotificationView;
