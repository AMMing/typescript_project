class MyClass extends React.Component<any, any> {
    render() {
        return <div>
        <div></div>
        </div> 
    }
}

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(<MyClass name="Tom" />, document.body);
});