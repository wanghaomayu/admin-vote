const updateConfig = [
  {
    value: 'title',
    label: '投票名称',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入订单名称'
    },
    hasFeedback: false
  }, {
    value: 'description',
    label: '投票描述',
    formType: 0,
    contentType: 'string',
    type: 'textarea',
    rules: {
      required: true,
      requiredMessage: '请输入关于投票项目的描述'
    }
  }, {
    value: 'type',
    label: '投票类型',
    formType: 2,
    contentType: 'string',
    extra: '投票类型为单选/多选/打分',
    rules: {
      required: true,
      requiredMessage: '请选择类型为：投票/打分'
    },
    options: [
      {
        value: '0',
        label: '单选'
      }, {
        value: '1',
        label: '多选'
      }, {
        value: '2',
        label: '打分'
      }],
    hasFeedback: false
  }, {
    value: 'startTime',
    label: '开始时间',
    formType: 4,
    contentType: 'array',
    rules: {
      required: true,
      requiredMessage: '请选择开始时间'
    }
  },
  {
    value: 'endTime',
    label: '结束时间',
    formType: 4,
    contentType: 'array',
    rules: {
      required: true,
      requiredMessage: '请选择结束时间'
    }
  }
]

export {updateConfig}
