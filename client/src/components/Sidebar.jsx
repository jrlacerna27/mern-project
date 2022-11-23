import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import EngineeringIcon from '@mui/icons-material/Engineering';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import StoreIcon from '@mui/icons-material/Store';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AddchartIcon from '@mui/icons-material/Addchart';
import ListIcon from '@mui/icons-material/List';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CircleIcon from '@mui/icons-material/Circle';

import { tokens } from '../theme';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const SidebarNav = ({ isCollapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState('Dashboard');

  return (
    <Box
      sx={{
        '& .pro-sidebar-inner': {
          background: `${colors.primary[400]} !important`,
        },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important',
        },
        '& .pro-inner-item': {
          padding: '5px 35px 5px 20px !important',
        },
        '& .pro-inner-item:hover': {
          color: '#868dfb !important',
          // backgroundColor: "#ffffff14 !important",
          borderRadius: '5px',
        },
        '& .pro-menu-item.active': {
          color: '#6870fa !important',
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed} collapsedWidth="0">
        <Menu iconShape="square">
          <SidebarHeader>
            {/* LOGO AND MENU ICON */}
            <MenuItem>
              <Box display="flex" alignItems="center" justifyContent="center">
                <img
                  alt="durabuild-logo"
                  width="100%"
                  height="100%"
                  src={`../../assets/durabuild-logo-outline.png`}
                  sx={{ cursor: 'pointer', borderRadius: '50%' }}
                />
              </Box>
            </MenuItem>
          </SidebarHeader>

          <Box>
            <Item
              to="/dashboard"
              title="Dashboard"
              icon={<DashboardIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <SubMenu title="Employee Transactions" icon={<GroupsIcon />}>
              <Item
                to="/employee"
                title=" Employee List"
                icon={<CircleIcon sx={{ fontSize: '8px' }} />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                to="/attendance"
                title=" Attendance"
                icon={<CircleIcon sx={{ fontSize: '8px' }} />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                to="/cash_advance"
                title=" Cash Advance"
                icon={<CircleIcon sx={{ fontSize: '8px' }} />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                to="/payroll"
                title=" Payroll"
                icon={<CircleIcon sx={{ fontSize: '8px' }} />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>

            <SubMenu title="Subcon Transactions" icon={<EngineeringIcon />}>
              <Item
                to="/subcon"
                title=" Subcontractor"
                icon={<CircleIcon sx={{ fontSize: '8px' }} />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                to="/subcon_payment"
                title=" Payment"
                icon={<CircleIcon sx={{ fontSize: '8px' }} />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>

            <SubMenu title="Project Management" icon={<ListIcon />}>
              <Item
                to="/contracts"
                title=" Contracts"
                icon={<CircleIcon sx={{ fontSize: '8px' }} />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                to="/contract_collections"
                title=" Collections"
                icon={<CircleIcon sx={{ fontSize: '8px' }} />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>

            <SubMenu title="Vendor Transactions" icon={<StoreIcon />}>
              <Item
                to="/vendor"
                title=" Vendors"
                icon={<CircleIcon sx={{ fontSize: '8px' }} />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                to="/purchase_order"
                title=" Purchase Order"
                icon={<CircleIcon sx={{ fontSize: '8px' }} />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                to="/purchase_invoice"
                title=" Purchase Invoice"
                icon={<CircleIcon sx={{ fontSize: '8px' }} />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                to="/payment"
                title=" Payment"
                icon={<CircleIcon sx={{ fontSize: '8px' }} />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                to="/debit_note"
                title=" Debit Note"
                icon={<CircleIcon sx={{ fontSize: '8px' }} />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>

            <SubMenu title="Warehouse Management" icon={<WarehouseIcon />}>
              <Item
                to="/warehouse"
                title=" Warehouse"
                icon={<CircleIcon sx={{ fontSize: '8px' }} />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                to="/materials"
                title=" Materials"
                icon={<CircleIcon sx={{ fontSize: '8px' }} />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                to="/stock_adjustment"
                title=" Stock Adjustment"
                icon={<CircleIcon sx={{ fontSize: '8px' }} />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                to="/stock_transfer"
                title=" Stock Transfer"
                icon={<CircleIcon sx={{ fontSize: '8px' }} />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                to="/warehouse_logs"
                title=" Warehouse Logs"
                icon={<CircleIcon sx={{ fontSize: '8px' }} />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>

            <SubMenu title="User Management" icon={<PersonIcon />}>
              <Item
                to="/users"
                title=" User List"
                icon={<CircleIcon sx={{ fontSize: '8px' }} />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>

            <SubMenu title="Reports" icon={<AddchartIcon />}>
              <Item
                to="/collection_report"
                title=" Collection"
                icon={<CircleIcon sx={{ fontSize: '8px' }} />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                to="/payroll"
                title=" Payroll"
                icon={<CircleIcon sx={{ fontSize: '8px' }} />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                to="/pi_report"
                title=" Purchase Invoice"
                icon={<CircleIcon sx={{ fontSize: '8px' }} />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default SidebarNav;
