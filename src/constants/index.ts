/**
 * 硬编码常量
 */

// 英文名称正则（字母开头，后续支持：字母、数字、下划线，不分区大小写）
export const NAME_REG = /^[a-z]\w+$/i;

// 邮箱地址正则
export const EMAIL_REG = /^\w+@\w+(\.\w+){1,2}$/i;

// 手机号正则
export const MOBILE_REG = /^1\d{10}$/;
