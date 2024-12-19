import { IcOutlineDelete, IcOutlineEdit } from "@/components/icons";
import { appURL } from "@/constants/url";
import { TColumn } from "@/types/table";
import {
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const Attractions: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const columns: TColumn[] = useMemo(
    () => [
      {
        key: "id",
        label: "ID",
      },
      {
        key: "name",
        label: "Name",
      },
      {
        key: "address",
        label: "Address",
      },
      {
        key: "action",
        label: "Action",
      },
    ],
    []
  );

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-3xl font-bold">Attractions</h2>

        <Button
          onPress={() => navigate(appURL.ADD_ATTRACTION)}
          size="md"
          color="primary"
          className="text-base"
        >
          Add attraction
        </Button>
      </div>
      <Table bottomContent={<Pagination total={1} showControls />}>
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={`attractions-header-${column.key}`}>
              {column.label}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Vịnh hạ long</TableCell>
            <TableCell>Quảnh Ninh</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button size="md" color="primary" isIconOnly>
                  <IcOutlineEdit />
                </Button>
                <Button
                  size="md"
                  className="text-white bg-carmine-red"
                  isIconOnly
                >
                  <IcOutlineDelete />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Attractions;
