var React = require('react');
const BaseLayout = require('./layouts/base_layout');
import { Canvas } from 'react-bootstrap';



function Index(props) {
    return <BaseLayout title={props.title}>
        <canvas id="myChart"></canvas>
    </BaseLayout>;
}

module.exports = Index;