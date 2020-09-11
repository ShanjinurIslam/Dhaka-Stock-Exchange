var React = require('react');
const BaseLayout = require('./layouts/base_layout');
import { Canvas } from 'react-bootstrap';



function Rows(props) {
    var rows = []
    for (var i = 0; i < props.labels.length; i++) {
        rows.push(<tr>
            <td>
                {props.labels[i]}
            </td>
            <td>
                {props.data[i]}
            </td>
        </tr>)
    }
    return rows
}

function Index(props) {
    return <BaseLayout title={props.title}>
        <table className="table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody>
                <Rows labels={props.labels} data={props.data}></Rows>
            </tbody>
        </table>
    </BaseLayout >;

}

module.exports = Index;