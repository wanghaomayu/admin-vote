import React, { Component } from 'react'
import { Form, Icon, Select, Modal, Table, Button, Alert } from 'antd'
import './index.less'
import { connect } from 'dva'
import moment from 'moment'
import { routerRedux } from 'dva/router'
import { DropOption } from '../../components/DropOption'

const Vote = ({app, dispatch, vote, location, form: {validateFeild}}) => {
  const {query} = location
  const {table = {}, tableSize, tablePage, tableCount} = vote
  const contestTable = ['进行中的投票', '未开始的投票', '已完成的投票']
  const onCreateClick = e => {
    e.preventDefault()
    dispatch(routerRedux.push(`/create`))
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
          onCancel () {}
        })
        break
    }
  }
  const columns = [
    {title: '序号', dataIndex: '', key: 'id', width: 50},
    {title: '投票名', key: 'title', dataIndex: 'title'},
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
                key: 'update', name: '修改投票',
              }, {
                key: 'delete', name: '删除',
              }]}
            buttonStyle={{border: 'solid 1px #eee'}}
            onMenuClick={({key}) => onMenuClick(key, record)}
          />
        )
      },
      fixed: 'right',
      width: 80,
      key: 'edit',
    },
  ]
  const pagination = {
    current: +tablePage,
    pageSize: +tableSize,
    total: +tableCount,
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
          placeholder='选择投票状态'
          filterOption={(input, option) => option.props.children.toLowerCase().
            indexOf(input.toLowerCase()) >= 0}
          onChange={() => {
            dispatch(routerRedux.push(`/vote`))
          }}
        >
          {contestTable.map(item => (
            <Select.Option key={item}>{item}</Select.Option>
          ))}
        </Select>
        <Button type='primary' onClick={onCreateClick}>创建投票</Button>
      </div>
      <div className='vote-content'>
        <Table
          columns={columns}
          bordered
          dataSource={table}
          pagination={pagination}
          rowKey={record => record.id}
        />
      </div>
    </div>
  )
}

export default connect(({app, vote}) => ({app, vote}))(Form.create()(Vote))