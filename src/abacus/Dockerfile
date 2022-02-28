FROM rust:1.59.0 AS builder
# Let's switch our working directory to `app` (equivalent to `cd app`)
# The `app` folder will be created for us by Docker in case it does not
# exist already.
WORKDIR app
# Copy all files from our working environment to our Docker image
COPY . .
# Let's build our binary!
RUN cargo build --release --bin=server


FROM rust:1.59.0 AS runtime
WORKDIR app
# Copy the compiled binary from the builder environment
# to our runtime environment
COPY --from=builder /app/target/release/server server
COPY --from=builder /app/server/rbac_policy.csv rbac_policy.csv
EXPOSE 5000/tcp
# When `docker run` is executed, launch the binary!
ENTRYPOINT ["./server"]
