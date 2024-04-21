import { Button, Input, Spin, Table, message } from 'antd';
import React, { useState } from 'react';

function MultiLinks({ links, setLinks, edit = false }) {
  const [value, setValue] = useState();

  const addLink = () => {
    // if same link already exists
    const isLinkExists = links.find((link) => link === value);
    if (isLinkExists) {
      message.error(`This link already exists!`);
      return;
    } else {
      if (value) {
        setLinks([...links, value]);
        setValue('');
      }
    }
  };

  const columns = [
    {
      title: 'Uploaded Links',
      dataIndex: 'links',
      key: 'links',
      render: (_, record) => <div>{record}</div>,
    },

    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Button
          onClick={() => {
            // if edit mode then remove from api

            setLinks(links.filter((link) => link !== record));

            // if (record.id) {
            //   mutateRemoveImage({ id: record.id });
            // } else {
            //   // remove from files
            //   setFiles(
            //     files.filter((file) => file.name !== record.originalFilename),
            //   );
            // }
            console.log(record);
          }}
        >
          Remove
        </Button>
      ),
    },
  ];

  return (
    <>
      <div>
        <div className="flex gap-2">
          <Input
            placeholder="Enter link here"
            value={value}
            onChange={(e) => setValue(e?.target?.value)}
          />
          <Button onClick={addLink}>Add Link</Button>
        </div>

        {links?.length > 0 && (
          <>
            <Spin spinning={false}>
              <Table
                className="mt-10"
                columns={columns}
                dataSource={links}
                pagination={false}
              />
            </Spin>
          </>
        )}
      </div>
    </>
  );
}

export default MultiLinks;
