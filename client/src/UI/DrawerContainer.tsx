const DrawerContainer = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            width: '10vw',
            background: '#2148C0',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                padding: '8vh 3vh'
            }}>
                <div>
                    <p>Home</p>
                </div>
                <div>
                    <p>Tasks</p>
                </div>
                <div>
                    <p>Task Groups</p>
                </div>
                <div>
                    <p>Logout</p>
                </div>
            </div>
        </div>
    )
}
export default DrawerContainer;
