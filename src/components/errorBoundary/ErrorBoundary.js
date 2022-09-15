import {Component} from "react";
import ErrorMassage from "../errorMassage/ErrorMassage";

class ErrorBoundary extends Component {
    state = {
        error: false
    }

    componentDidCatch(error, errorInfo) {
        console.log(error,errorInfo);
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMassage/>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;