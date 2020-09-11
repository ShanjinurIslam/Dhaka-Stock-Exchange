var React = require('react');
const BaseLayout = require('./layouts/base_layout');
import { Col, Row, Card, Form, FormGroup, Button, Container, Image } from 'react-bootstrap';


function Index(props) {
    return <BaseLayout title={props.title}>
        <Row>
            <Col style={{ marginTop: '15%', marginLeft: '5%' }}>
                <h3>Welcome to DSExchange</h3>
                <h1>
                    API Platform
                </h1>
            </Col>
            <Col style={{ marginTop: '15%', marginLeft: '5%' }}>
                <h4>Available APIs</h4>

                <ul>
                    <li>
                        /company_list<br />
                        <strong>Method:</strong> GET<br />
                        <strong>URL:</strong> /api/company_list
                    </li>
                    <li>
                        /share_price<br />
                        <strong>Method:</strong> GET<br />
                        <strong>URL:</strong> /api/share_price?name=ABBANK
                    </li>
                    <li>
                        /company_details<br />
                        <strong>Method:</strong> GET<br />
                        <strong>URL:</strong> /api/company_details?name=ABBANK
                    </li>
                    <li>
                        /latest_price<br />
                        <strong>Method:</strong> GET<br />
                        <strong>URL:</strong> /api/latest_price
                    </li>
                    <li>
                        /company_data<br />
                        <strong>Method:</strong> GET<br />
                        <strong>URL:</strong> /api/company_data?name=ABBANK&type=price&duration=24
                    </li>
                </ul>
            </Col>
        </Row>
    </BaseLayout>;
}

module.exports = Index;