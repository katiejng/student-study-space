import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const UserDropdown = () => (
  <Dropdown item icon='user'>
    <Dropdown.Menu>
      <Dropdown.Item>UNIT</Dropdown.Item>
      <Dropdown.Item>UNIT</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export default UserDropdown