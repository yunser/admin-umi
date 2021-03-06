import { connect } from 'dva'
import { Switch, Tag } from 'antd'
import TableLayout from '_components/TableLayout'
import Breadcrumb from '_components/Breadcrumb'
import { commonTime, oneRow } from '_components/tableCeil'
import router from 'umi/router'

const MODEL_NAME = 'article'

const Index = ({ dispatch, _model, location }) => {
    const { dataSource } = _model

    const columns = [
        {
            title: '标题',
            dataIndex: 'title',
            width: 200,
            // render: oneRow
            render: (text, item) => {
                return <a onClick={() => router.push(`/articles/${item.id}`)}>{text}</a>
            },
        },
        {
            title: '内容类型',
            dataIndex: 'contentType',
        },
        {
            title: '置顶',
            dataIndex: 'top',
            render: (text, item) => {
                return <Switch checked={top === 1} />
            },
        },
        {
            title: '标签',
            dataIndex: 'tags',
            render: (text, item) => {
                console.log('text', text)
                let tags = item.tags.map(tag => {
                    return <Tag>{tag}</Tag>
                })
                return tags
            },
        },
        {
            title: '创建者',
            dataIndex: 'user.name',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            render: commonTime
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            render: commonTime
        },
    ]

    const layoutProps = {
        _model,
        dispatch,
        location,
        columns
    }
    const breadcrumbProps = {
        data: [
            {
                text: '文章管理',
            },
        ]
    }

    return (
        <div>
            <Breadcrumb {...breadcrumbProps} />
            <TableLayout {...layoutProps} />
        </div>
    );
};

export default connect(({ [MODEL_NAME]: _model }) => ({
    _model,
}))(Index)
