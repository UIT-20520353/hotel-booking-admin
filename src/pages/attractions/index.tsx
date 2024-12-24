import { attractionApi } from "@/api";
import { IcOutlineDelete, IcOutlineEdit } from "@/components/icons";
import { appURL } from "@/constants/url";
import { TAttraction } from "@/types/attraction";
import { TPagination } from "@/types/pagination";
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
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConfirmDeleteModal } from "./components";
import { NotificationModal, TModalData } from "@/components/common";

const Attractions: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const [dataPopup, setDataPopup] = useState<undefined | TModalData>(undefined);
  const [selectedDeleteAttraction, setSelectedDeleteAttraction] = useState<
    TAttraction | undefined
  >(undefined);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<TPagination>({
    page: 1,
  });
  const [attraction, setAttraction] = useState<{
    items: TAttraction[];
    totalPages: number;
  }>({ items: [], totalPages: 1 });

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

  const getAllAttractions = useCallback(async () => {
    setLoading(true);
    const { ok, body, totalPages } = await attractionApi.getAllAttractions({
      page: pagination.page - 1,
    });
    setLoading(false);
    if (ok && body && totalPages) {
      setAttraction({ items: body, totalPages });
    }
  }, [pagination]);

  const onDeleteAttraction = useCallback(async (id: number) => {
    setSelectedDeleteAttraction(undefined);

    const { ok, error } = await attractionApi.deleteAttraction(id);

    if (ok) {
      setDataPopup({
        message: "Attraction deleted successfully",
        onClose: () => {
          setDataPopup(undefined);
          setPagination({ page: 1 });
        },
        type: "success",
      });
    }

    if (error) {
      setDataPopup({
        message: error.detail,
        onClose: () => setDataPopup(undefined),
        type: "error",
      });
    }
  }, []);

  useEffect(() => {
    getAllAttractions();
  }, [getAllAttractions]);

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-3xl font-bold">Attractions</h2>

        <Button
          onPress={() => navigate(appURL.ADD_ATTRACTION)}
          size="sm"
          color="primary"
          className="text-sm font-medium"
        >
          Add attraction
        </Button>
      </div>
      <Table
        bottomContent={
          <Pagination
            onChange={(page) => setPagination({ page })}
            page={pagination.page}
            total={attraction.totalPages}
            showControls
          />
        }
      >
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={`attractions-header-${column.key}`}>
              {column.label}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody isLoading={isLoading}>
          {attraction.items
            ? attraction.items.map((attraction) => (
                <TableRow key={`table-attraction-row-${attraction.id}`}>
                  <TableCell>{attraction.id}</TableCell>
                  <TableCell>{attraction.name}</TableCell>
                  <TableCell>{attraction.address}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        onPress={() =>
                          navigate(appURL.EDIT_ATTRACTION(attraction.id))
                        }
                        size="md"
                        color="primary"
                        isIconOnly
                      >
                        <IcOutlineEdit />
                      </Button>
                      <Button
                        onPress={() => setSelectedDeleteAttraction(attraction)}
                        size="md"
                        className="text-white bg-carmine-red"
                        isIconOnly
                      >
                        <IcOutlineDelete />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            : []}
        </TableBody>
      </Table>

      <ConfirmDeleteModal
        attraction={selectedDeleteAttraction}
        onClose={() => setSelectedDeleteAttraction(undefined)}
        onConfirm={onDeleteAttraction}
      />
      <NotificationModal data={dataPopup} />
    </div>
  );
};

export default Attractions;
