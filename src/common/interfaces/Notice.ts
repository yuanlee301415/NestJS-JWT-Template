// 通知类型
export enum NoticeType {
  Notification, // 通知
  Message, // 消息
  Event, // 事件
}

// Notification 类型(仅用于前端使用不同图标显示，无实际意义)
export enum NotificationSubType {
  Work,
  Your,
  Template,
  Icon,
}

// 事件状态
export enum NoticeEventStatus {
  Todo, // 未开始
  Urgent, // 紧急的
  Doing, // 进行中
  Finished, // 已结束
}
