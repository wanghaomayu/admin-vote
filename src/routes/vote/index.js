import React from 'react'
import { Form, Icon, Select, Modal, Table, Button, Alert } from 'antd'
import './index.less'
import { connect } from 'dva'
import moment from 'moment'
import { routerRedux } from 'dva/router'
import {updateConfig} from './config'
import DropOption from '../../components/DropOption'
import FormItemRender from '../../components/FormItemRender'

const Vote = ({app, dispatch, vote, location, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {query} = location
  const {table = {}, tableSize, tablePage, tableCount, modal = false, modalContent} = vote
  const contestTable = ['进行中的投票', '未开始的投票', '已完成的投票']
  const onSelectChange = (value) => {
    switch (value) {
      case '进行中的投票':
        dispatch({type: 'vote/fetchTableCurrent'})
        break
      case '未开始的投票':
        dispatch({type: 'vote/fetchTableUnStart'})
        break
      case '已完成的投票':
        dispatch({type: 'vote/fetchTablePast'})
        break
      default:
        break
    }
  }
  const onCreateClick = e => {
    e.preventDefault()
    dispatch(routerRedux.push(`/create`))
  }
  const onModalOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      const {
        title = '', description = '', startTime = '', endTime = '', totalCount = '', customerInfo = '', type = '', addOn = ''
      } = values
      let payload = {}
      if (modal === 'update') {
        payload = {
          title,
          description,
          type: +type,   //   上传给后端的type数据类型需要是number，故强制转换
          startTime: startTime.format('YYYY-MM-DD 08:00:00'),
          endTime: endTime.format('YYYY-MM-DD 00:08:00'),
        }
      }
      dispatch({type: `current/${modal}`, payload: payload})
    })
  }
  const onMenuClick = (key, record) => {
    let payload = {}
    switch (key) {
      case 'update':
        const {startTime, endTime} = record
        payload = {
          ...record,
          startTime: moment(startTime, 'YYYY-MM-DD'),
          endTime: moment(endTime, 'YYYY-MM-DD'),
        }
        dispatch({type: 'order/updateModalContent', payload: payload})
        dispatch({type: 'order/showModal', payload: 'update'})
        break
      case 'delete':
        confirm({
          title: '删除确认',
          content: `您确定要删除 ${record.title} 吗？`,
          onOk () { dispatch({type: 'vote/delete', payload: {query, record}}) },
          onCancel () {},
        })
        break
    }
  }
  const columns = [
    {title: '序号', dataIndex: '', key: 'id', width: 50},
    {title: '投票名', key: 'title', dataIndex: 'title'},
    {title: '投票类型', key: 'type', dataIndex: 'type'},
    {title: '全部数量', key: 'totalCount', dataIndex: 'totalCount'},
    {title: '投票描述', key: '', dataIndex: ''},
    {title: '创建时间', key: 'createdAt', dataIndex: 'createdAt'},
    {title: '更新时间', key: 'updatedAt', dataIndex: 'updatedAt'},
    {title: '开始时间', key: 'startTime', dataIndex: 'startTime'},
    {title: '结束时间', key: 'endTime', dataIndex: 'endTime'},
    {
      title: '操作',
      render: (record) => {
        return (
          <DropOption
            menuOptions={[
              {
                key: 'update', name: '修改投票'
              }, {
                key: 'delete', name: '删除'
              }]}
            buttonStyle={{border: 'solid 1px #eee'}}
            onMenuClick={({key}) => onMenuClick(key, record)}
          />
        )
      },
      fixed: 'right',
      width: 80,
      key: 'edit'
    },
  ]
  const pagination = {
    current: +tablePage || 1,
    pageSize: +tableSize || 20,
    total: +tableCount || 20,
    pageSizeOptions: ['20', '50', '100'],
    showSizeChanger: true,
    onChange: (current) => {
      dispatch(routerRedux.push(`/vote?page=${current}&size=${tableSize}`))
    },
    onShowSizeChange: (current, pageSize) => {
      dispatch(routerRedux.push(`/vote?page=${current}&size=${pageSize}`))
    }
  }
  return (
    <div className='vote'>
      <div className='vote-header'>
        <Select
          showSearch
          style={{width: 260}}
          placeholder='选择处于不同状态的投票'
          filterOption={(input, option) => option.props.children.toLowerCase().
            indexOf(input.toLowerCase()) >= 0}
          onChange={onSelectChange}
          defaultValue='进行中的投票'
        >
          {contestTable.map((item, i) => (
            <Select.Option key={i}>{item}</Select.Option>
          ))}
        </Select>
        <Button type='primary' onClick={onCreateClick}>创建投票</Button>
      </div>
      <div className='vote-content'>
        {
          table.length === 0 ? (
            <Table
              columns={columns}
              bordered
              dataSource={table}
              pagination={pagination}
              rowKey={record => record.id}
            />
          ) : (
            <Alert
              message={(<span>暂无有效投票票项目，请先行创建项目</span>)}
              description={(<span>点击右上角蓝色"创建投票"按钮</span>)}
              type='info'
              showIcon
            />
          )
        }
        <Modal
          title={modalContent.title}
          visible={!!modal}
          onCancel={() => dispatch({type: 'vote/hideModal'})}
          onOk={onModalOk}
          key={'' + modal}
        >
          <Form className='form-content'>
            {
              (modal === 'update') && updateConfig.map(
                config => FormItemRender(config, getFieldDecorator,
                  {initialValue: modalContent[config.value]}))
            }
          </Form>
        </Modal>
      </div>
    </div>
  )
}

export default connect(({app, vote}) => ({app, vote}))(Form.create()(Vote))
