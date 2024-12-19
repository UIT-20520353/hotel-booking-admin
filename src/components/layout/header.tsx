import { GridiconsUser } from "@/components/icons";
import appConstants from "@/constants/app";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { useMemo } from "react";
import { useLocalStorage } from "usehooks-ts";

type DropdownItem = {
  key: string;
  label: string;
};

const Header: React.FunctionComponent = () => {
  const [, , removeAccessToken] = useLocalStorage(
    appConstants.ACCESS_TOKEN_KEY,
    undefined
  );

  const dropdownItems: DropdownItem[] = useMemo(
    () => [
      {
        key: "logout",
        label: "Logout",
      },
    ],
    []
  );

  return (
    <header className="sticky top-0 z-50 flex items-center justify-end w-full h-16 px-5 bg-white border-b border-gray-300">
      <Dropdown>
        <DropdownTrigger>
          <Button radius="full" variant="solid" color="default" isIconOnly>
            <GridiconsUser />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          onAction={(key) => {
            if (key === "logout") {
              removeAccessToken();
            }
          }}
          aria-label="User menu"
          items={dropdownItems}
        >
          {(item) => (
            <DropdownItem key={item.key} className="text-base">
              {item.label}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </header>
  );
};

export default Header;
