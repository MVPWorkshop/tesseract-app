import React from "react";
import { Dropdown } from "react-bootstrap";
import Typography from "../../atoms/Typography/typography.atom";
import { EColor } from "../../../shared/types/styles.types";
import { Nullable } from "../../../shared/types/util.types";
import styles from "./dropdownMenu.molecule.module.scss";
import { IDropdownMenuProps } from "./dropdownMenu.molecule.types";
import { classes } from "../../../shared/utils/styles.util";

const DropdownMenu: React.FC<IDropdownMenuProps> = (props) => {

  const {
    onSelect,
    items,
    selected,
    className
  } = props;

  const onItemSelect = (eventKey: Nullable<string>) => {
    if (eventKey) {
      onSelect(eventKey);
    }
  };

  const dropdownMenuClass = classes(
    styles.dropdownMenu,
    className
  );

  return (
    <Dropdown onSelect={onItemSelect} className={dropdownMenuClass}>
      <Dropdown.Toggle variant={"flat"}>
        <Typography uppercase={true}>
          {selected}
        </Typography>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {items.map(item => (
          <Dropdown.Item eventKey={item} active={selected === item}>
            <Typography uppercase={true} color={EColor.WHITE}>
              {item}
            </Typography>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownMenu;
