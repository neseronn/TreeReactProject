import { Routes, Route } from 'react-router-dom';
import { Breadcrumb, Layout, Menu, theme, Button } from 'antd';
import CommonForm from './components/CommonForm';
import DataEntry from './pages/DataEntry';

const { Header, Content, Footer } = Layout;

function App() {
    return (
        <Layout className='layout' style={{ height: '100%' }}>
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    maxHeight: '48px',
                    overflow: 'hidden',
                }}>
                <Menu
                    mode='horizontal'
                    defaultSelectedKeys={['1']}
                    className='menu'
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        // maxHeight: '48px',
                    }}
                    // items={[
                    //     { key: 0, label: 'Главная' },
                    //     { key: 1, label: 'История' },
                    // ]}
                >
                    <Menu.Item key='1'>Главная</Menu.Item>
                    <Menu.Item key='2'>
                        <Button>История</Button>
                    </Menu.Item>
                </Menu>
            </Header>
            <Content
                style={{
                    padding: '0 20px',
                }}>
                <Breadcrumb
                    style={{
                        margin: '10px 0',
                    }}>
                    <Breadcrumb.Item>Главная</Breadcrumb.Item>
                    <Breadcrumb.Item>Ввод данных</Breadcrumb.Item>
                </Breadcrumb>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        // height: '100%',
                        // width: '100%',
                    }}>
                    <div
                        style={{
                            // padding: 20,
                            // minHeight: 600,
                            background: '#e1e1e1',
                            width: '100%',
                            display: 'flex',
                            transition: 'width 0.5s ease-in-out',
                            overflow: 'hidden',
                        }}>
                        <Routes>
                            <Route path='/' element={<DataEntry />} />
                            {/* <Route path='/:id' element={<ArticlePage />} /> */}
                            {/* <Route path='/results' element={<ArticlePage />} /> */}
                        </Routes>
                    </div>
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                    color: '#686868',
                }}>
                ©2023
            </Footer>
        </Layout>
    );
}

export default App;
