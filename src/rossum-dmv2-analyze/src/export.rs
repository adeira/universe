use csv;
use serde::Serialize;
use std::io;
use tempfile::NamedTempFile;

#[derive(Serialize)]
pub struct CsvRecord {
    pub operation: String,
    pub document_original_file_name: String,
    pub document_mime_type: String,
    pub datapoint_id: String,
    pub datapoint_value_content: String,
    pub datapoint_value_options: String,
}

pub struct CsvWriter {
    writer: csv::Writer<std::fs::File>,
}

impl CsvWriter {
    pub fn new(file_path: &Option<&String>) -> Result<Self, csv::Error> {
        let writer = match file_path {
            Some(path) => csv::Writer::from_path(path)?,
            None => {
                let tmpfile = NamedTempFile::new()?;
                csv::Writer::from_path(tmpfile)?
            }
        };
        Ok(Self { writer })
    }

    pub fn write_record(&mut self, record: &CsvRecord) -> Result<(), csv::Error> {
        self.writer.serialize(record)
    }

    pub fn flush(&mut self) -> Result<(), io::Error> {
        self.writer.flush()
    }
}
