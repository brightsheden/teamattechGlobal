// @flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';

function AdminScreen() {
    return (
        <div>
            <h1>welcome to admin screen</h1>
            <div>
                <div>
                    <Link to="/admin/agric">Agric page</Link>
                </div>
            </div>

            <div>
                <div>
                    <Link to="/admin/natural">Natural Resources page</Link>
                </div>
            </div>

            <div>
                <div>
                    <Link to="/admin/information">ICT page</Link>
                </div>
            </div>

            <div>
                <div>
                    <Link to="/admin/blogs">Blog page</Link>
                </div>
            </div>

            <div>
                <div>
                    <Link to="/admin/orders">ALL Orders</Link>
                </div>
            </div>
        </div>
        
    );
};

export default AdminScreen;